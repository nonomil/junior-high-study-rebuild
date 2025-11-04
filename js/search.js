// 通用搜索功能 - 适用于所有页面
(function() {
    'use strict';
    
    let searchData = [];
    
    // 初始化搜索数据
    function initSearchData() {
        searchData = [];
        
        // 搜索页面中的所有标题和内容
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5');
        const sections = document.querySelectorAll('section, .content-section, .card');
        
        headings.forEach(heading => {
            const id = heading.id || heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
            if (!heading.id) {
                heading.id = id;
            }
            
            searchData.push({
                title: heading.textContent.trim(),
                content: heading.textContent.trim(),
                id: id,
                type: 'heading',
                element: heading
            });
        });
        
        sections.forEach(section => {
            const id = section.id || section.querySelector('h1, h2, h3')?.id || null;
            if (id) {
                const title = section.querySelector('h1, h2, h3')?.textContent.trim() || '';
                const content = section.textContent.trim().substring(0, 200);
                
                if (!searchData.find(item => item.id === id)) {
                    searchData.push({
                        title: title || '未命名章节',
                        content: content,
                        id: id,
                        type: 'section',
                        element: section
                    });
                }
            }
        });
    }
    
    // 执行搜索
    function performSearch() {
        const query = document.getElementById('searchInput')?.value.trim() || '';
        const resultsContainer = document.getElementById('searchResults');
        
        if (!resultsContainer) return;
        
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10);
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">未找到相关内容</div>';
        } else {
            resultsContainer.innerHTML = results.map(result => {
                const highlightedTitle = highlightText(result.title, query);
                return `<div class="search-result-item" onclick="goToSearchResult('${result.id}')">
                    <strong>${highlightedTitle}</strong>
                    <br><small>${result.type === 'heading' ? '标题' : '章节'}</small>
                </div>`;
            }).join('');
        }
        
        resultsContainer.style.display = 'block';
    }
    
    // 高亮搜索关键词
    function highlightText(text, query) {
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }
    
    // 跳转到搜索结果
    window.goToSearchResult = function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 高亮显示
            element.style.backgroundColor = '#fef3c7';
            setTimeout(() => {
                element.style.backgroundColor = '';
            }, 2000);
            
            // 隐藏搜索结果
            const resultsContainer = document.getElementById('searchResults');
            if (resultsContainer) {
                resultsContainer.style.display = 'none';
            }
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
            }
        }
    };
    
    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        // 初始化搜索数据
        initSearchData();
        
        // 实时搜索
        searchInput.addEventListener('input', function() {
            performSearch();
        });
        
        // 点击外部隐藏搜索结果
        document.addEventListener('click', function(e) {
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer && !searchContainer.contains(e.target)) {
                const resultsContainer = document.getElementById('searchResults');
                if (resultsContainer) {
                    resultsContainer.style.display = 'none';
                }
            }
        });
        
        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    });
})();

