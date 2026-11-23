<#
.SYNOPSIS
    Antigravity Skills Manager for Portfolio 2.
.DESCRIPTION
    Activates, searches, and manages skills from the 3,100+ Agentic Awesome Skills library.
.EXAMPLE
    .\activate-skills.ps1 -ListBundles
    .\activate-skills.ps1 -ListActive
    .\activate-skills.ps1 -Search "portfolio"
    .\activate-skills.ps1 -Bundle "Web Wizard", "Design Studio"
    .\activate-skills.ps1 -Skill "interactive-portfolio", "react-patterns"
    .\activate-skills.ps1 -Bundle "Essentials" -Clear
#>
[CmdletBinding()]
param(
    [string[]]$Bundle,
    [string[]]$Skill,
    [string]$Search,
    [switch]$Clear,
    [switch]$ListBundles,
    [switch]$ListActive
)

$RootDir = $PSScriptRoot
$AgentsDir = Join-Path $RootDir ".agents"
$ActiveSkillsDir = Join-Path $AgentsDir "skills"
$LibraryDir = Join-Path $AgentsDir "skills_library"
$BundlesFile = Join-Path $AgentsDir "data\editorial-bundles.json"

if (-not (Test-Path $ActiveSkillsDir)) {
    New-Item -ItemType Directory -Path $ActiveSkillsDir -Force | Out-Null
}

# --- LIST ACTIVE SKILLS ---
if ($ListActive) {
    Write-Host "`n=== Currently Active Skills in .agents\skills ===" -ForegroundColor Cyan
    $active = Get-ChildItem -Path $ActiveSkillsDir -Directory
    if ($active.Count -eq 0) {
        Write-Host "No skills currently active." -ForegroundColor Yellow
    } else {
        foreach ($s in $active) {
            Write-Host "  - $($s.Name)" -ForegroundColor Green
        }
        Write-Host "`nTotal active skills: $($active.Count)" -ForegroundColor Cyan
    }
    return
}

# --- LIST BUNDLES ---
if ($ListBundles) {
    if (Test-Path $BundlesFile) {
        $json = Get-Content -Path $BundlesFile -Raw -Encoding UTF8 | ConvertFrom-Json
        Write-Host "`n=== Available Skill Bundles ===" -ForegroundColor Cyan
        foreach ($b in $json.bundles) {
            $skillCount = ($b.skills | Measure-Object).Count
            Write-Host "$($b.emoji) $($b.name) " -NoNewline -ForegroundColor Yellow
            Write-Host "($($b.id)) - $skillCount skills" -ForegroundColor Gray
            Write-Host "   $($b.audience)" -ForegroundColor DarkGray
        }
        Write-Host "`nTo activate a bundle, run: .\activate-skills.ps1 -Bundle `"<Bundle Name>`"" -ForegroundColor Cyan
    } else {
        Write-Error "Bundles file not found at $BundlesFile"
    }
    return
}

# --- SEARCH SKILLS ---
if ($Search) {
    Write-Host "`n=== Searching skills for '$Search' ===" -ForegroundColor Cyan
    $matches = @(Get-ChildItem -Path $LibraryDir -Directory | Where-Object { $_.Name -like "*$Search*" })
    if ($matches.Count -eq 0) {
        Write-Host "No skills found matching '$Search'." -ForegroundColor Yellow
    } else {
        foreach ($m in $matches) {
            $skillDoc = Join-Path $m.FullName "SKILL.md"
            $desc = ""
            if (Test-Path $skillDoc) {
                $lines = Get-Content -Path $skillDoc -TotalCount 20
                $descLine = $lines | Where-Object { $_ -match "^description:\s*(.+)$" } | Select-Object -First 1
                if ($descLine) {
                    $desc = ($descLine -replace "^description:\s*", "").Trim()
                }
            }
            Write-Host "  $($m.Name)" -ForegroundColor Green -NoNewline
            if ($desc) { Write-Host " - $desc" -ForegroundColor Gray } else { Write-Host "" }
        }
        Write-Host "`nFound $($matches.Count) matching skills." -ForegroundColor Cyan
        Write-Host "To activate, run: .\activate-skills.ps1 -Skill <skill-name>" -ForegroundColor Gray
    }
    return
}

# --- CLEAR / ARCHIVE ---
if ($Clear) {
    Write-Host "[RESET] Clearing currently active skills..." -ForegroundColor Yellow
    $active = Get-ChildItem -Path $ActiveSkillsDir -Directory
    foreach ($a in $active) {
        Remove-Item -Path $a.FullName -Recurse -Force
    }
}

$skillsToActivate = [System.Collections.Generic.List[string]]::new()

# --- RESOLVE BUNDLES ---
if ($Bundle) {
    if (Test-Path $BundlesFile) {
        $json = Get-Content -Path $BundlesFile -Raw -Encoding UTF8 | ConvertFrom-Json
        foreach ($bQuery in $Bundle) {
            $normQuery = ($bQuery -replace "[^a-zA-Z0-9]+", "-").ToLower().Trim('-')
            $foundBundle = $json.bundles | Where-Object {
                $_.name.ToLower() -eq $bQuery.ToLower() -or
                $_.id.ToLower() -eq $normQuery -or
                $_.name.ToLower() -like "*$($bQuery.ToLower())*"
            } | Select-Object -First 1

            if ($foundBundle) {
                Write-Host "Expanding bundle: $($foundBundle.name) ($(($foundBundle.skills | Measure-Object).Count) skills)" -ForegroundColor Cyan
                foreach ($s in $foundBundle.skills) {
                    $skillId = if ($s.id) { $s.id } else { $s }
                    if (-not $skillsToActivate.Contains($skillId)) {
                        $skillsToActivate.Add($skillId)
                    }
                }
            } else {
                Write-Warning "Bundle '$bQuery' not recognized. Run with -ListBundles to see available options."
            }
        }
    }
}

# --- RESOLVE INDIVIDUAL SKILLS ---
if ($Skill) {
    foreach ($s in $Skill) {
        if (-not $skillsToActivate.Contains($s)) {
            $skillsToActivate.Add($s)
        }
    }
}

# --- ACTIVATE RESOLVED SKILLS ---
if ($skillsToActivate.Count -gt 0) {
    Write-Host "`nActivating $($skillsToActivate.Count) skills..." -ForegroundColor Cyan
    $activatedCount = 0
    foreach ($skillId in $skillsToActivate) {
        $cleanId = $skillId -replace "/", "\"
        $src = Join-Path $LibraryDir $cleanId
        $dst = Join-Path $ActiveSkillsDir $cleanId

        if (Test-Path $src) {
            Copy-Item -Path $src -Destination $dst -Recurse -Force
            Write-Host "  [+] $skillId" -ForegroundColor Green
            $activatedCount++
        } else {
            Write-Warning "  [-] Skill '$skillId' not found in library."
        }
    }
    Write-Host "`nSuccessfully activated $activatedCount skills into .agents\skills." -ForegroundColor Cyan
} elseif (-not $Clear) {
    Write-Host "`nUsage:" -ForegroundColor Yellow
    Write-Host "  .\activate-skills.ps1 -ListBundles                 # View all bundles"
    Write-Host "  .\activate-skills.ps1 -ListActive                  # View active skills"
    Write-Host "  .\activate-skills.ps1 -Search `"<keyword>`"          # Search skill library"
    Write-Host "  .\activate-skills.ps1 -Bundle `"<name>`"             # Activate a bundle"
    Write-Host "  .\activate-skills.ps1 -Skill `"<name>`"              # Activate specific skill"
    Write-Host "  .\activate-skills.ps1 -Bundle `"<name>`" -Clear      # Replace active skills"
}
