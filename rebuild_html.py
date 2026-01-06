#!/usr/bin/env python3
# Rebuild index.html with ES Modules

with open('index.backup.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Write first 299 lines (HTML structure up to </div> before script)
with open('index.html', 'w', encoding='utf-8') as out:
    out.writelines(lines[:299])
    
    # Add module import
    out.write('\n    <!-- ES Modules -->\n')
    out.write('    <script type="module" src="js/main.js"></script>\n')
    
    # Add modal HTML (lines 943-963 from backup)
    out.writelines(lines[942:])

print("Done: Rebuilt index.html with ES Modules")
