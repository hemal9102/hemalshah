import os
import re

blog_dir = r"h:\portfolio_website\hemalshah\blogs"
blog_files = ["blog1.html", "blog2.html", "blog3.html", "blog4.html", "blog5.html"]

author_badge = """
        <div class="author-badge" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
          <img src="../assets/favicon.png" width="50" style="border-radius: 50%;">
          <div>
            <strong style="color: #fff; display: block; font-size: 1.1rem;">Hemal Shah (HK)</strong>
            <span style="font-size: 0.9rem; color: #94a3b8;">AI Automation Engineer & Technical SEO</span>
          </div>
        </div>
"""

schema_template = """
  <!-- JSON-LD Structured Data for SEO & LLMs -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "{title}",
    "description": "{description}",
    "author": {
      "@type": "Person",
      "name": "Hemal Shah",
      "alternateName": ["HK", "HK Engineering", "Hemal Shah HK"],
      "url": "https://hemalshah.vercel.app/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "HK Engineering",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hemalshah.vercel.app/assets/favicon.png"
      }
    }
  }
  </script>
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who wrote this article?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This article was written by Hemal Shah (HK), an AI Automation Engineer and Technical SEO expert."
        }
      }
    ]
  }
  </script>
"""

keywords_meta = '  <meta name="keywords" content="Hemal Shah, HK, Hemal Shah HK, HK Engineering, AI Engineer, Python Developer, SEO Automation, AI Automation" />'

for file_name in blog_files:
    file_path = os.path.join(blog_dir, file_name)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace SpringSummer with HK Engineering
    content = content.replace("SpringSummer", "HK Engineering")
    content = content.replace("SpringSummer Portfolio", "HK Engineering")
    
    # Extract Title
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1).split("–")[0].strip() if title_match else "Blog"
    
    # Extract Description
    desc_match = re.search(r'<meta name="description" content="(.*?)"', content)
    desc = desc_match.group(1) if desc_match else ""
    
    # Update Title properly
    content = re.sub(r'<title>.*?</title>', f'<title>{title} | Hemal Shah (HK)</title>', content)
    
    # Insert Keywords and Schema if not exists
    if "application/ld+json" not in content:
        head_end_idx = content.find("</head>")
        if head_end_idx != -1:
            schema_filled = schema_template.replace("{title}", title).replace("{description}", desc)
            injection = f"{keywords_meta}\n{schema_filled}\n"
            content = content[:head_end_idx] + injection + content[head_end_idx:]
            
    # Insert Author Badge right before <h1>
    if 'class="author-badge"' not in content:
        h1_match = re.search(r'(<h1>.*?</h1>)', content)
        if h1_match:
            content = content.replace(h1_match.group(1), author_badge + h1_match.group(1))

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
print("Successfully upgraded all 5 blogs!")
