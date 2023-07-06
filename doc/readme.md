# Installing nodejs/npm/npx in windows

Bug: when installing nodejs in windows the installer select "Program Files" as default path, but then when running npm it try to find npm content in "Users\$User\AppData\Roaming" and it doesn't exists so returns error.
Solution: Reinstall node in "Users\$User\AppData\Roaming" directly from installer.
Issue: https://github.com/nodejs/node-v0.x-archive/issues/8117