from html5print import HTMLBeautifier

html = '<title>Page Title</title><p>Some text here</p>'
print(HTMLBeautifier.beautify(html, 4))
