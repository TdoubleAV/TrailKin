#!/usr/bin/env python3
import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the script block
# Start: <script> after </div> (line 299-300)
# End: </script> before <!-- Input Modal -->

pattern = r'(<\/div>\s*\r?\n\s*)<script>.*?<\/script>(\s*\r?\n\s*<!-- Input Modal -->)'
replacement = r'\1<!-- ES Modules -->\n    <script type="module" src="js/main.js"></script>\2'

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done: Replaced script block with ES Module import")
