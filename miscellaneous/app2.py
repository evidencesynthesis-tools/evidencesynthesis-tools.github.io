import streamlit as st
import re
from collections import defaultdict


#Please make sure it follows sample_for_app2py.rtf explicitly.

def parse_tools(text_content):
    """
    Parses text in the format:
    1. Name - Year - Technical - Category
    """
    lines = text_content.strip().split('\n')
    parsed_data = []

    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        
        parts = line.split(' - ')
        
      
        if len(parts) == 4:
            name_raw = parts[0].strip()
            
         
            name = re.sub(r'^\d+\.\s*', '', name_raw)
            
            year = parts[1].strip()
            technical = parts[2].strip()
            functional = parts[3].strip()

            parsed_data.append({
                "name": name,
                "year": year,
                "technical": technical,
                "functional": functional
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
    st.title("Tool Parser & Analyzer (Text Format)")
    st.markdown("""
    Parses text list and extracts:
    - **Name**, **Year**
    - **Functional Category**
    - **Technical Category**
    
    Also generates **Statistics** by Year and Category.
    """)


    html_input = st.text_area("Paste Tool List Here", height=200, placeholder="1. CitationChaser - 2022 - Java - Automation\n2. litsearchr - 2019 - R - Search")

    if st.button("Parse & Analyze"):
        if not html_input.strip():
            st.warning("Please paste the tool list.")
        else:

            results = parse_tools(html_input)

            if not results:
                st.error("No valid tool entries found. Please check the format: '1. Name - Year - Tech - Category'")
            else:
             
                st.header("1. Parsed Tools List")
                for i, item in enumerate(results, 1):
                    st.markdown(f"{i}. {item['name']} - {item['year']} - {item['technical']} - {item['functional']}")

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
                # Filter years (range is checked)
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