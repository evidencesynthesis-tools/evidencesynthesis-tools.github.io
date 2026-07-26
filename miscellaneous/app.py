import streamlit as st
from bs4 import BeautifulSoup
import re
from collections import defaultdict


# Technical Categories (Must be found by searching text in Title/Description) #dummy, everything will be manually checked anyways!
TECHNICAL_CATEGORIES = [
    "R", "Python", "Desktop software", "Java", "C++", "C#", "JAvascript", "Typescript", "PHP"
]

def get_year_from_citation(card):
    """Extracts year from citation text, e.g., (2024)."""
    citation_tag = card.find('span', class_='citation-text')
    if citation_tag:
        match = re.search(r'\((\d{4})\)', citation_tag.get_text())
        if match:
            return match.group(1)
    return "Not found"

def get_functional_categories(card):
    """Extracts all categories strictly from class='badge' automatically."""
    badges = card.find_all('span', class_='badge')
    found = []
    for badge in badges:
        text = badge.get_text(strip=True)
        if text:
            found.append(text)
    return ", ".join(found) if found else "Not found"

def get_technical_categories(title, desc):
    """Extracts categories by searching keywords in title and description."""
    text_to_search = (title + " " + desc).lower()
    found = []
    
    for category in TECHNICAL_CATEGORIES:
        search_term = category.lower()
        
  
        if search_term == "r":
            if re.search(r'\br\b', text_to_search):
                found.append(category)
        elif search_term == "java":
  
            if re.search(r'\bjava\b', text_to_search):
                found.append(category)
        else:

            if search_term in text_to_search:
                found.append(category)
                
    return ", ".join(found) if found else "Not found"

def parse_tools(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    cards = soup.find_all('div', class_='tool-card')
    
    parsed_data = []

    for card in cards:

        title_tag = card.find('h3', class_='card-title')
        name = title_tag.get_text(strip=True) if title_tag else "Name Not Found"
        
       
        desc_tag = card.find('p', class_='card-desc')
        desc = desc_tag.get_text(strip=True) if desc_tag else ""

      
        year = get_year_from_citation(card)

      
        func = get_functional_categories(card)


        tech = get_technical_categories(name, desc)

        parsed_data.append({
            "name": name,
            "year": year,
            "technical": tech,
            "functional": func
        })
        
    return parsed_data

def display_stats_section(title, group_dict, sort_keys=True):
    """Helper to display statistics sections."""
    st.subheader(title)
    keys = sorted(group_dict.keys()) if sort_keys else group_dict.keys()
    
    count_found = False
    
    for key in keys:
        tools = group_dict[key]
        if tools:
            count_found = True
            st.markdown(f"**{key}** ({len(tools)})")
          
            tool_list = "\n".join([f"{i+1}. {t['name']}" for i, t in enumerate(tools)])
            st.markdown(f"<div style='font-size: 0.9em; color: #555;'>{tool_list}</div>", unsafe_allow_html=True)
            st.markdown("---") 
            
    if not count_found:
        st.markdown("*No data found for this section.*")
    
    st.markdown("<br>", unsafe_allow_html=True)

def main():
    st.set_page_config(page_title="Advanced Tool Parser", layout="wide")
    st.title("HTML Tool Card Parser & Analyzer (Here,just use parsed tools list & year statistics, don't take the rest of the stats if you find 'Not found' in parsed list. For rest, use Another .py file where you fill the 'Not found'as well as check the other content manually.)")
    st.markdown("""
    Parses HTML tool cards and extracts:
    - **Name**, **Year**
    - **Functional Category** (Detected automatically from HTML Badges)
    - **Technical Category** (From Keyword Search in Title/Desc)
    
    Also generates **Statistics** by Year and Category.
    """)

    html_input = st.text_area("Paste HTML Code Here", height=200, placeholder="<div class='tool-card'>...")

    if st.button("Parse & Analyze"):
        if not html_input.strip():
            st.warning("Please paste HTML code.")
        else:

            results = parse_tools(html_input)

            if not results:
                st.error("No valid tool cards found.")
            else:
             
                st.header("1. Parsed Tools List")
                for i, item in enumerate(results, 1):
                    st.markdown(f"**{i}.** {item['name']} - {item['year']} - {item['technical']} - {item['functional']}")

                st.markdown("---")
                

                year_groups = defaultdict(list)
           
                tech_groups = defaultdict(list)
               
                func_groups = defaultdict(list)

                for tool in results:
                 
                    if tool['year'] != "Not found":
                        year_groups[tool['year']].append(tool)
                    
               
                    techs = tool['technical'].split(", ")
                    for t in techs:
                        if t != "Not found":
                            tech_groups[t].append(tool)

                    
                    funcs = tool['functional'].split(", ")
                    for f in funcs:
                        if f != "Not found":
                            func_groups[f].append(tool)

            
                st.header("2. Statistics by Year (2000 - 2026)")
                # Filter years (range is checked) #imp
                for y in range(2000, 2027):
                    y_str = str(y)
                    if y_str in year_groups:
                        tools = year_groups[y_str]
                        st.markdown(f"**{y_str}** ({len(tools)} tools)")
                        tool_list = "\n".join([f"{i+1}. {t['name']}" for i, t in enumerate(tools)])
                        st.markdown(f"<div style='font-size: 0.9em; color: #555;'>{tool_list}</div>", unsafe_allow_html=True)
                        st.markdown("---")
                
               
                display_stats_section("3. Statistics by Functional Category", func_groups, sort_keys=True)

    
                display_stats_section("4. Statistics by Technical Category", tech_groups, sort_keys=True)

if __name__ == "__main__":
    main()