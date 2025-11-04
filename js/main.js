// 主要JavaScript功能文件

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializePageLoader();
});

// 导航功能初始化
function initializeNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
            
            // 更新活动状态
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
        });
    });
}

// 移动端菜单功能
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击菜单项后关闭移动菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// 滚动效果初始化
function initializeScrollEffects() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--bg-primary)';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // 平滑滚动到指定区域
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    // 切换侧边栏显示/隐藏
    window.toggleSidebar = function() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar && mainContent) {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        }
    };
}

// 页面加载器初始化
function initializePageLoader() {
    // 页面内容映射 - 包含所有新页面
    const pageContent = {
        'home': 'home-page',
        'time-management': 'pages/time-management.html',
        'math': 'pages/math.html',
        'physics': 'pages/physics.html',
        'english': 'pages/english.html',
        'chemistry': 'pages/chemistry.html',
        'chinese': 'pages/chinese.html',
        'politics-history': 'pages/politics-history.html',
        'biology': 'pages/biology.html',
        'geography': 'pages/geography.html',
        'family-education': 'pages/family-education.html',
        'learning-strategies': 'pages/learning-strategies.html',
        'homework-strategy': 'pages/homework-strategy.html',
        'tutoring-decision': 'pages/tutoring-decision.html',
        'learning-diagnosis': 'pages/learning-diagnosis.html',
        'resources': 'pages/resources.html',
        'emergency': 'pages/emergency-strategies.html',
        'emergency-strategies': 'pages/emergency-strategies.html'
    };
    
    window.loadPage = function(pageName) {
        const homePage = document.getElementById('home-page');
        const dynamicContent = document.getElementById('dynamic-content');
        
        if (pageName === 'home') {
            // 显示首页
            homePage.classList.add('active');
            dynamicContent.classList.remove('active');
            dynamicContent.innerHTML = '';
            return;
        }
        
        // 隐藏首页，显示动态内容
        homePage.classList.remove('active');
        dynamicContent.classList.add('active');
        
        // 加载页面内容
        if (pageContent[pageName]) {
            loadPageContent(pageName, pageContent[pageName]);
        } else {
            dynamicContent.innerHTML = '<div class="content-page"><h1>页面未找到</h1><p>抱歉，您访问的页面不存在。</p></div>';
        }
    };
}

// 加载页面内容
function loadPageContent(pageName, contentPath) {
    const dynamicContent = document.getElementById('dynamic-content');
    
    // 显示加载状态
    dynamicContent.innerHTML = `
        <div class="content-page">
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i>
                <p style="margin-top: 1rem;">正在加载内容...</p>
            </div>
        </div>
    `;
    
    // 根据页面名称生成内容
    setTimeout(() => {
        const content = generatePageContent(pageName);
        dynamicContent.innerHTML = content;
        dynamicContent.classList.add('fade-in');
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
}

// 生成页面内容
function generatePageContent(pageName) {
    const pageTemplates = {
        'time-management': {
            title: '时间管理与学习计划 - 8个月冲刺方案',
            content: `
                <a href="#" class="back-button" onclick="loadPage('home')">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                <h1>时间管理与学习计划</h1>
                <h2>8个月冲刺方案概览</h2>
                <img src="images/8个月学习时间轴.svg" alt="8个月学习时间轴" style="width: 100%; margin: 2rem 0;">
                
                <h2>第一阶段：基础诊断期 (1-2月)</h2>
                <h3>目标设定</h3>
                <ul>
                    <li>全面评估当前学习状况</li>
                    <li>识别各科目薄弱环节</li>
                    <li>制定个性化学习方案</li>
                    <li>建立学习习惯和时间管理体系</li>
                </ul>
                
                <h3>具体行动</h3>
                <ul>
                    <li><strong>学习现状评估</strong>：完成各科目基础测试，明确起点水平</li>
                    <li><strong>问题根源分析</strong>：深入分析学习困难的具体原因</li>
                    <li><strong>目标制定</strong>：设定8个月的总体目标和阶段性目标</li>
                    <li><strong>计划制定</strong>：制定详细的日、周、月学习计划</li>
                </ul>
                
                <h2>第二阶段：知识重建期 (3-5月)</h2>
                <h3>重点任务</h3>
                <ul>
                    <li>系统梳理各科知识体系</li>
                    <li>填补基础知识漏洞</li>
                    <li>建立学科思维框架</li>
                    <li>培养良好学习方法</li>
                </ul>
                
                <h3>学习策略</h3>
                <ul>
                    <li><strong>数学</strong>：从基础概念开始，逐步建立完整知识网络</li>
                    <li><strong>物理</strong>：重点理解概念，结合实验加深理解</li>
                    <li><strong>英语</strong>：扩大词汇量，强化语法基础</li>
                    <li><strong>文科</strong>：构建知识框架，培养记忆技巧</li>
                </ul>
                
                <h2>第三阶段：能力提升期 (6-7月)</h2>
                <h3>提升重点</h3>
                <ul>
                    <li>强化解题技巧和应用能力</li>
                    <li>提升学习效率和质量</li>
                    <li>培养考试技巧和心理素质</li>
                    <li>加强薄弱科目的专项训练</li>
                </ul>
                
                <h2>第四阶段：冲刺突破期 (8月)</h2>
                <h3>冲刺策略</h3>
                <ul>
                    <li>综合性复习和模拟训练</li>
                    <li>查漏补缺，解决遗留问题</li>
                    <li>心理调节和考试准备</li>
                    <li>最终冲刺和成果验收</li>
                </ul>
                
                <h2>时间管理技巧</h2>
                <img src="images/学习效率提升技巧图.svg" alt="学习效率提升技巧" style="width: 100%; margin: 2rem 0;">
                
                <h3>番茄工作法</h3>
                <ul>
                    <li>25分钟专注学习 + 5分钟休息</li>
                    <li>4个番茄钟后休息15-30分钟</li>
                    <li>记录每日完成的番茄钟数量</li>
                </ul>
                
                <h3>优先级管理</h3>
                <ul>
                    <li>重要且紧急：立即处理</li>
                    <li>重要不紧急：计划安排</li>
                    <li>紧急不重要：委托或快速处理</li>
                    <li>不重要不紧急：减少或避免</li>
                </ul>
                
                <h2>学习效果评估</h2>
                <img src="images/学习效果评估流程图.svg" alt="学习效果评估流程" style="width: 100%; margin: 2rem 0;">
                
                <h3>评估指标</h3>
                <ul>
                    <li><strong>知识掌握度</strong>：通过测试检验知识点掌握情况</li>
                    <li><strong>学习效率</strong>：单位时间内的学习成果</li>
                    <li><strong>进步速度</strong>：成绩提升的快慢程度</li>
                    <li><strong>学习状态</strong>：专注度、积极性等主观感受</li>
                </ul>
            `
        },
        'math': {
            title: '数学科目学习指南 - 基础重建与专项突破',
            content: `
                <a href="#" class="back-button" onclick="loadPage('home')">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                <h1>数学科目学习指南</h1>
                <h2>数学知识体系重建</h2>
                <img src="images/数学知识体系重建图.svg" alt="数学知识体系重建图" style="width: 100%; margin: 2rem 0;">
                
                <h2>问题诊断与分析</h2>
                <h3>常见问题类型</h3>
                <ul>
                    <li><strong>基础概念不清</strong>：对基本概念理解模糊，影响后续学习</li>
                    <li><strong>计算能力薄弱</strong>：运算错误频繁，影响解题准确性</li>
                    <li><strong>逻辑思维不足</strong>：缺乏数学思维，解题思路混乱</li>
                    <li><strong>应用能力差</strong>：不会将数学知识应用到实际问题</li>
                </ul>
                
                <h3>根源分析</h3>
                <ul>
                    <li>小学数学基础不扎实</li>
                    <li>学习方法不当，死记硬背</li>
                    <li>缺乏系统性学习规划</li>
                    <li>练习量不足或质量不高</li>
                </ul>
                
                <h2>知识体系重建计划</h2>
                <h3>第一阶段：数与式 (3月)</h3>
                <ul>
                    <li><strong>有理数</strong>：数轴、绝对值、四则运算</li>
                    <li><strong>整式</strong>：单项式、多项式、整式运算</li>
                    <li><strong>分式</strong>：分式的概念、运算、化简</li>
                    <li><strong>二次根式</strong>：概念、性质、运算</li>
                </ul>
                
                <h3>第二阶段：方程与不等式 (4月)</h3>
                <ul>
                    <li><strong>一元一次方程</strong>：解法、应用题</li>
                    <li><strong>二元一次方程组</strong>：解法、应用</li>
                    <li><strong>一元二次方程</strong>：解法、判别式、韦达定理</li>
                    <li><strong>不等式</strong>：一元一次不等式、不等式组</li>
                </ul>
                
                <h3>第三阶段：函数 (5月)</h3>
                <ul>
                    <li><strong>函数概念</strong>：定义、表示方法、性质</li>
                    <li><strong>一次函数</strong>：图像、性质、应用</li>
                    <li><strong>反比例函数</strong>：图像、性质</li>
                    <li><strong>二次函数</strong>：图像、性质、最值问题</li>
                </ul>
                
                <h2>专项训练计划</h2>
                <h3>计算能力训练</h3>
                <ul>
                    <li><strong>每日计算</strong>：每天完成20道基础计算题</li>
                    <li><strong>限时训练</strong>：提高计算速度和准确性</li>
                    <li><strong>错题整理</strong>：分析计算错误原因，避免重复犯错</li>
                </ul>
                
                <h3>解题思维训练</h3>
                <ul>
                    <li><strong>题型归类</strong>：按题型整理解题方法</li>
                    <li><strong>思路分析</strong>：重点分析解题思路和方法</li>
                    <li><strong>变式练习</strong>：通过变式题加深理解</li>
                </ul>
                
                <h3>应用题专项</h3>
                <ul>
                    <li><strong>审题训练</strong>：准确理解题意，提取关键信息</li>
                    <li><strong>建模能力</strong>：将实际问题转化为数学问题</li>
                    <li><strong>分类练习</strong>：按应用题类型分类练习</li>
                </ul>
                
                <h2>学习方法指导</h2>
                <h3>概念学习法</h3>
                <ol>
                    <li><strong>理解定义</strong>：准确理解概念的内涵和外延</li>
                    <li><strong>举例说明</strong>：通过具体例子加深理解</li>
                    <li><strong>对比分析</strong>：与相关概念进行对比</li>
                    <li><strong>应用练习</strong>：在练习中巩固概念</li>
                </ol>
                
                <h3>公式记忆法</h3>
                <ol>
                    <li><strong>理解推导</strong>：理解公式的推导过程</li>
                    <li><strong>记忆技巧</strong>：使用口诀、图像等辅助记忆</li>
                    <li><strong>反复练习</strong>：通过练习熟练掌握</li>
                    <li><strong>灵活应用</strong>：在不同情境中应用公式</li>
                </ol>
                
                <h2>学习资源推荐</h2>
                <h3>教材与辅导书</h3>
                <ul>
                    <li><strong>人教版数学教材</strong>：基础知识学习</li>
                    <li><strong>《初中数学基础训练》</strong>：基础练习</li>
                    <li><strong>《数学思维训练》</strong>：思维能力提升</li>
                </ul>
                
                <h3>在线资源</h3>
                <ul>
                    <li><strong>Khan Academy</strong>：免费数学课程</li>
                    <li><strong>洋葱数学</strong>：动画讲解数学概念</li>
                    <li><strong>作业帮</strong>：题目解答和讲解</li>
                </ul>
            `
        },
        'physics': {
            title: '物理科目学习指南 - 概念理解与实验突破',
            content: `
                <a href="#" class="back-button" onclick="loadPage('home')">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                <h1>物理科目学习指南</h1>
                <h2>物理学习现状诊断</h2>
                
                <h3>常见学习困难</h3>
                <ul>
                    <li><strong>概念理解困难</strong>：物理概念抽象，难以理解</li>
                    <li><strong>公式记忆混乱</strong>：公式多且相似，容易混淆</li>
                    <li><strong>实验理解不足</strong>：缺乏实验操作经验</li>
                    <li><strong>计算能力薄弱</strong>：物理计算题解题困难</li>
                    <li><strong>图像分析能力差</strong>：不会分析物理图像</li>
                </ul>
                
                <h2>知识体系重建</h2>
                <h3>第一阶段：力学基础 (3月)</h3>
                <ul>
                    <li><strong>运动的描述</strong>：
                        <ul>
                            <li>机械运动、参照物、路程和位移</li>
                            <li>速度概念、匀速直线运动</li>
                            <li>变速运动、平均速度</li>
                        </ul>
                    </li>
                    <li><strong>声现象</strong>：
                        <ul>
                            <li>声音的产生和传播</li>
                            <li>声音的特性：音调、响度、音色</li>
                            <li>噪声的危害和控制</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>第二阶段：光学与热学 (4月)</h3>
                <ul>
                    <li><strong>光现象</strong>：
                        <ul>
                            <li>光的直线传播、光的反射</li>
                            <li>平面镜成像、光的折射</li>
                            <li>凸透镜成像规律</li>
                        </ul>
                    </li>
                    <li><strong>物态变化</strong>：
                        <ul>
                            <li>温度、熔化和凝固</li>
                            <li>汽化和液化、升华和凝华</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>第三阶段：电学基础 (5月)</h3>
                <ul>
                    <li><strong>电流和电路</strong>：
                        <ul>
                            <li>电荷、电流、电路</li>
                            <li>串联和并联电路</li>
                            <li>电流的测量</li>
                        </ul>
                    </li>
                    <li><strong>电压和电阻</strong>：
                        <ul>
                            <li>电压、电阻概念</li>
                            <li>变阻器、欧姆定律</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>概念理解策略</h2>
                <h3>物理概念学习方法</h3>
                <ol>
                    <li><strong>生活联系法</strong>：将抽象概念与生活实例联系</li>
                    <li><strong>类比理解法</strong>：用熟悉的事物类比新概念</li>
                    <li><strong>图像辅助法</strong>：用图像、图表帮助理解</li>
                    <li><strong>实验验证法</strong>：通过实验加深概念理解</li>
                </ol>
                
                <h3>重点概念突破</h3>
                <ul>
                    <li><strong>力的概念</strong>：
                        <ul>
                            <li>力是物体对物体的作用</li>
                            <li>力的三要素：大小、方向、作用点</li>
                            <li>力的作用效果：改变运动状态、改变形状</li>
                        </ul>
                    </li>
                    <li><strong>能量概念</strong>：
                        <ul>
                            <li>动能、势能的概念和影响因素</li>
                            <li>机械能守恒定律</li>
                            <li>能量转化和守恒定律</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>实验学习指导</h2>
                <h3>实验学习方法</h3>
                <ol>
                    <li><strong>预习实验</strong>：了解实验目的、原理、步骤</li>
                    <li><strong>观察现象</strong>：仔细观察实验现象</li>
                    <li><strong>分析数据</strong>：学会处理实验数据</li>
                    <li><strong>得出结论</strong>：根据实验结果得出结论</li>
                </ol>
                
                <h3>重点实验突破</h3>
                <ul>
                    <li><strong>测量类实验</strong>：
                        <ul>
                            <li>长度测量、时间测量</li>
                            <li>质量测量、密度测量</li>
                            <li>力的测量、速度测量</li>
                        </ul>
                    </li>
                    <li><strong>探究类实验</strong>：
                        <ul>
                            <li>探究影响摩擦力大小的因素</li>
                            <li>探究杠杆的平衡条件</li>
                            <li>探究电流与电压、电阻的关系</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>计算题解题策略</h2>
                <h3>解题步骤</h3>
                <ol>
                    <li><strong>审题</strong>：仔细阅读题目，理解题意</li>
                    <li><strong>分析</strong>：分析物理过程，确定物理量</li>
                    <li><strong>列式</strong>：根据物理规律列出方程</li>
                    <li><strong>求解</strong>：解方程，得出结果</li>
                    <li><strong>检验</strong>：检查结果的合理性</li>
                </ol>
                
                <h3>常用解题方法</h3>
                <ul>
                    <li><strong>公式法</strong>：直接应用物理公式</li>
                    <li><strong>比例法</strong>：利用物理量之间的比例关系</li>
                    <li><strong>图像法</strong>：利用图像分析物理过程</li>
                    <li><strong>能量法</strong>：从能量角度分析问题</li>
                </ul>
                
                <h2>学习效果评估</h2>
                <h3>知识点检测</h3>
                <ul>
                    <li><strong>概念理解</strong>：能否准确表述物理概念</li>
                    <li><strong>规律掌握</strong>：能否正确应用物理规律</li>
                    <li><strong>实验技能</strong>：能否独立完成基础实验</li>
                </ul>
                
                <h3>能力评估</h3>
                <ul>
                    <li><strong>分析能力</strong>：能否分析简单的物理现象</li>
                    <li><strong>计算能力</strong>：能否解决基础计算题</li>
                    <li><strong>实验能力</strong>：能否设计简单实验</li>
                </ul>
            `
        },
        'english': {
            title: '英语科目学习指南 - 词汇语法与技能突破',
            content: `
                <a href="#" class="back-button" onclick="loadPage('home')">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                <h1>英语科目学习指南</h1>
                <h2>英语学习现状诊断</h2>
                
                <h3>常见学习问题</h3>
                <ul>
                    <li><strong>词汇量不足</strong>：基础词汇掌握不够，影响理解</li>
                    <li><strong>语法基础薄弱</strong>：语法规则不清楚，句子结构混乱</li>
                    <li><strong>听力理解困难</strong>：听不懂基础对话和短文</li>
                    <li><strong>阅读速度慢</strong>：阅读理解能力不足</li>
                    <li><strong>写作表达困难</strong>：不会用英语表达思想</li>
                    <li><strong>口语交流障碍</strong>：不敢开口说英语</li>
                </ul>
                
                <h2>知识体系重建计划</h2>
                <h3>第一阶段：词汇基础建设 (3月)</h3>
                <ul>
                    <li><strong>核心词汇</strong>：
                        <ul>
                            <li>掌握初中1000个核心词汇</li>
                            <li>每天学习30-40个新单词</li>
                            <li>重点掌握词汇的多种含义和用法</li>
                        </ul>
                    </li>
                    <li><strong>词汇记忆方法</strong>：
                        <ul>
                            <li>词根词缀记忆法</li>
                            <li>联想记忆法</li>
                            <li>语境记忆法</li>
                            <li>卡片记忆法</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>第二阶段：语法体系构建 (4月)</h3>
                <ul>
                    <li><strong>基础语法</strong>：
                        <ul>
                            <li>词性：名词、动词、形容词、副词</li>
                            <li>句子成分：主语、谓语、宾语、定语、状语</li>
                            <li>句子类型：陈述句、疑问句、祈使句、感叹句</li>
                        </ul>
                    </li>
                    <li><strong>时态语态</strong>：
                        <ul>
                            <li>一般现在时、一般过去时、一般将来时</li>
                            <li>现在进行时、过去进行时</li>
                            <li>现在完成时、过去完成时</li>
                            <li>被动语态的构成和用法</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>第三阶段：技能综合提升 (5月)</h3>
                <ul>
                    <li><strong>听力技能</strong>：
                        <ul>
                            <li>基础对话理解</li>
                            <li>短文听力理解</li>
                            <li>关键信息捕捉</li>
                        </ul>
                    </li>
                    <li><strong>阅读技能</strong>：
                        <ul>
                            <li>快速阅读技巧</li>
                            <li>细节理解能力</li>
                            <li>主旨大意把握</li>
                            <li>推理判断能力</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>专项训练计划</h2>
                <h3>词汇专项训练</h3>
                <ul>
                    <li><strong>每日词汇计划</strong>：
                        <ul>
                            <li>新词学习：每天30个新单词</li>
                            <li>复习巩固：复习前一天学过的词汇</li>
                            <li>应用练习：在句子中使用新学词汇</li>
                        </ul>
                    </li>
                    <li><strong>词汇记忆技巧</strong>：
                        <ul>
                            <li>制作词汇卡片，随时复习</li>
                            <li>使用词汇APP进行碎片化学习</li>
                            <li>通过阅读文章学习词汇</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>语法专项训练</h3>
                <ul>
                    <li><strong>语法学习步骤</strong>：
                        <ol>
                            <li>理解语法规则</li>
                            <li>记忆语法要点</li>
                            <li>练习语法题目</li>
                            <li>在写作中应用</li>
                        </ol>
                    </li>
                    <li><strong>重点语法突破</strong>：
                        <ul>
                            <li>动词时态的正确使用</li>
                            <li>从句的识别和运用</li>
                            <li>非谓语动词的用法</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>阅读专项训练</h3>
                <ul>
                    <li><strong>阅读策略</strong>：
                        <ul>
                            <li>预测：根据标题预测内容</li>
                            <li>略读：快速浏览获取大意</li>
                            <li>寻读：寻找特定信息</li>
                            <li>精读：仔细阅读理解细节</li>
                        </ul>
                    </li>
                    <li><strong>阅读技巧</strong>：
                        <ul>
                            <li>根据上下文猜测词义</li>
                            <li>识别文章结构和逻辑关系</li>
                            <li>抓住关键词和主题句</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>写作专项训练</h3>
                <ul>
                    <li><strong>写作步骤</strong>：
                        <ol>
                            <li>审题：理解写作要求</li>
                            <li>构思：组织写作思路</li>
                            <li>列纲：制作写作提纲</li>
                            <li>写作：按提纲写作</li>
                            <li>修改：检查和修改文章</li>
                        </ol>
                    </li>
                    <li><strong>写作技巧</strong>：
                        <ul>
                            <li>使用简单句和复合句结合</li>
                            <li>运用连接词使文章连贯</li>
                            <li>积累常用写作句型和表达</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>学习方法指导</h2>
                <h3>科学记忆方法</h3>
                <ul>
                    <li><strong>艾宾浩斯遗忘曲线</strong>：
                        <ul>
                            <li>第1天：学习后立即复习</li>
                            <li>第2天：再次复习</li>
                            <li>第4天：第三次复习</li>
                            <li>第7天：第四次复习</li>
                            <li>第15天：第五次复习</li>
                        </ul>
                    </li>
                    <li><strong>多感官记忆</strong>：
                        <ul>
                            <li>视觉：看单词卡片</li>
                            <li>听觉：听单词发音</li>
                            <li>动觉：书写单词</li>
                            <li>语言：大声朗读</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>语言环境创造</h3>
                <ul>
                    <li><strong>听力环境</strong>：
                        <ul>
                            <li>每天听英语新闻或故事</li>
                            <li>观看英语动画片或电影</li>
                            <li>听英语歌曲</li>
                        </ul>
                    </li>
                    <li><strong>阅读环境</strong>：
                        <ul>
                            <li>阅读英语故事书</li>
                            <li>浏览英语网站</li>
                            <li>阅读英语杂志</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>学习资源推荐</h2>
                <h3>教材与辅导书</h3>
                <ul>
                    <li><strong>人教版英语教材</strong>：基础知识学习</li>
                    <li><strong>《新概念英语》</strong>：语法和词汇提升</li>
                    <li><strong>《初中英语语法大全》</strong>：语法系统学习</li>
                </ul>
                
                <h3>在线学习平台</h3>
                <ul>
                    <li><strong>百词斩</strong>：词汇记忆</li>
                    <li><strong>扇贝英语</strong>：综合技能训练</li>
                    <li><strong>可可英语</strong>：听力训练</li>
                    <li><strong>英语流利说</strong>：口语练习</li>
                </ul>
                
                <h2>学习效果评估</h2>
                <h3>词汇掌握检测</h3>
                <ul>
                    <li>每周词汇测试：检测新学词汇掌握情况</li>
                    <li>词汇应用测试：在句子中正确使用词汇</li>
                    <li>词汇量测试：定期测试总词汇量</li>
                </ul>
                
                <h3>语法能力检测</h3>
                <ul>
                    <li>语法选择题：测试语法规则掌握</li>
                    <li>句子改错：检测语法应用能力</li>
                    <li>句子翻译：测试语法综合运用</li>
                </ul>
                
                <h3>技能水平检测</h3>
                <ul>
                    <li>听力理解测试：测试听力水平</li>
                    <li>阅读理解测试：测试阅读能力</li>
                    <li>写作能力测试：测试写作水平</li>
                </ul>
            `
        },
        'politics-history': {
            title: '政治历史科目学习指南 - 记忆技巧与答题策略',
            content: `
                <a href="#" class="back-button" onclick="loadPage('home')">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                <h1>政治历史科目学习指南</h1>
                <h2>文科学习现状诊断</h2>
                
                <h3>政治学科常见问题</h3>
                <ul>
                    <li><strong>理论理解困难</strong>：马克思主义基本原理抽象难懂</li>
                    <li><strong>知识点记忆混乱</strong>：概念多、相似度高，容易混淆</li>
                    <li><strong>材料分析能力弱</strong>：不会分析政治材料</li>
                    <li><strong>答题思路不清</strong>：不知道如何组织答案</li>
                    <li><strong>时政联系不够</strong>：理论与实际脱节</li>
                </ul>
                
                <h3>历史学科常见问题</h3>
                <ul>
                    <li><strong>时间概念模糊</strong>：历史事件时间记忆不准确</li>
                    <li><strong>因果关系不清</strong>：不理解历史事件的前因后果</li>
                    <li><strong>人物事迹混淆</strong>：历史人物及其贡献记忆混乱</li>
                    <li><strong>史料分析困难</strong>：不会分析历史材料</li>
                    <li><strong>历史意义理解浅</strong>：不理解历史事件的深层意义</li>
                </ul>
                
                <h2>政治知识体系重建</h2>
                <h3>第一阶段：马克思主义基本观点 (3月)</h3>
                <ul>
                    <li><strong>物质和意识</strong>：
                        <ul>
                            <li>物质决定意识</li>
                            <li>意识的能动作用</li>
                            <li>一切从实际出发</li>
                        </ul>
                    </li>
                    <li><strong>运动和发展</strong>：
                        <ul>
                            <li>运动是物质的根本属性</li>
                            <li>发展的普遍性</li>
                            <li>用发展的观点看问题</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>第二阶段：中国特色社会主义 (4月)</h3>
                <ul>
                    <li><strong>基本国情</strong>：
                        <ul>
                            <li>社会主义初级阶段</li>
                            <li>基本路线和基本纲领</li>
                            <li>改革开放的意义</li>
                        </ul>
                    </li>
                    <li><strong>发展战略</strong>：
                        <ul>
                            <li>科学发展观</li>
                            <li>可持续发展战略</li>
                            <li>创新驱动发展</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>第三阶段：经济生活 (5月)</h3>
                <ul>
                    <li><strong>市场经济</strong>：
                        <ul>
                            <li>市场配置资源</li>
                            <li>市场经济的基本特征</li>
                            <li>宏观调控的必要性</li>
                        </ul>
                    </li>
                    <li><strong>消费和生产</strong>：
                        <ul>
                            <li>消费的作用和类型</li>
                            <li>生产决定消费</li>
                            <li>消费反作用于生产</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>历史知识体系重建</h2>
                <h3>第一阶段：中国古代史 (3月)</h3>
                <ul>
                    <li><strong>先秦时期</strong>：
                        <ul>
                            <li>夏商周三代的政治制度</li>
                            <li>春秋战国的社会变革</li>
                            <li>诸子百家的思想</li>
                        </ul>
                    </li>
                    <li><strong>秦汉时期</strong>：
                        <ul>
                            <li>秦朝的统一和制度</li>
                            <li>汉朝的政治经济</li>
                            <li>丝绸之路的开辟</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>第二阶段：中国近代史 (4月)</h3>
                <ul>
                    <li><strong>鸦片战争到甲午战争</strong>：
                        <ul>
                            <li>鸦片战争的影响</li>
                            <li>洋务运动的兴起</li>
                            <li>甲午战争的后果</li>
                        </ul>
                    </li>
                    <li><strong>戊戌变法到辛亥革命</strong>：
                        <ul>
                            <li>戊戌变法的意义</li>
                            <li>义和团运动</li>
                            <li>辛亥革命的成果</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>第三阶段：世界历史 (5月)</h3>
                <ul>
                    <li><strong>资本主义的兴起</strong>：
                        <ul>
                            <li>新航路开辟</li>
                            <li>文艺复兴</li>
                            <li>工业革命</li>
                        </ul>
                    </li>
                    <li><strong>两次世界大战</strong>：
                        <ul>
                            <li>第一次世界大战的原因和影响</li>
                            <li>俄国十月革命</li>
                            <li>第二次世界大战</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>记忆技巧与方法</h2>
                <h3>政治知识记忆技巧</h3>
                <ul>
                    <li><strong>关键词记忆法</strong>：
                        <ul>
                            <li>提取每个知识点的关键词</li>
                            <li>用关键词串联整个知识体系</li>
                            <li>通过关键词回忆完整内容</li>
                        </ul>
                    </li>
                    <li><strong>逻辑框架记忆法</strong>：
                        <ul>
                            <li>构建知识的逻辑关系图</li>
                            <li>按照逻辑顺序记忆</li>
                            <li>理解内在联系</li>
                        </ul>
                    </li>
                    <li><strong>联想记忆法</strong>：
                        <ul>
                            <li>将抽象概念与具体事例联系</li>
                            <li>用生活实例理解理论</li>
                            <li>建立知识间的联想</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>历史知识记忆技巧</h3>
                <ul>
                    <li><strong>时间轴记忆法</strong>：
                        <ul>
                            <li>制作历史事件时间轴</li>
                            <li>按时间顺序记忆事件</li>
                            <li>理解历史发展脉络</li>
                        </ul>
                    </li>
                    <li><strong>人物记忆法</strong>：
                        <ul>
                            <li>以重要历史人物为线索</li>
                            <li>记忆人物的主要事迹</li>
                            <li>理解人物的历史作用</li>
                        </ul>
                    </li>
                    <li><strong>事件记忆法</strong>：
                        <ul>
                            <li>记忆事件的背景、过程、结果</li>
                            <li>理解事件的历史意义</li>
                            <li>分析事件的影响</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>答题策略与技巧</h2>
                <h3>选择题答题策略</h3>
                <ul>
                    <li><strong>审题技巧</strong>：
                        <ul>
                            <li>仔细阅读题干，抓住关键信息</li>
                            <li>注意题目的限定条件</li>
                            <li>理解题目要求</li>
                        </ul>
                    </li>
                    <li><strong>排除法</strong>：
                        <ul>
                            <li>排除明显错误的选项</li>
                            <li>排除与题意不符的选项</li>
                            <li>在剩余选项中选择最佳答案</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>材料分析题答题策略</h3>
                <ul>
                    <li><strong>材料分析步骤</strong>：
                        <ol>
                            <li>仔细阅读材料，理解材料内容</li>
                            <li>分析材料反映的问题</li>
                            <li>联系相关理论知识</li>
                            <li>组织答案，条理清晰</li>
                        </ol>
                    </li>
                    <li><strong>答题格式</strong>：
                        <ul>
                            <li>理论阐述：先说明相关理论</li>
                            <li>材料分析：分析材料体现的问题</li>
                            <li>结合实际：联系现实情况</li>
                            <li>得出结论：总结观点</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>论述题答题策略</h3>
                <ul>
                    <li><strong>答题结构</strong>：
                        <ul>
                            <li>开头：提出观点或论点</li>
                            <li>主体：分层论述，逻辑清晰</li>
                            <li>结尾：总结观点，升华主题</li>
                        </ul>
                    </li>
                    <li><strong>论述技巧</strong>：
                        <ul>
                            <li>观点明确，论据充分</li>
                            <li>层次分明，逻辑严密</li>
                            <li>语言准确，表达清晰</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>学习方法指导</h2>
                <h3>政治学习方法</h3>
                <ul>
                    <li><strong>理论联系实际</strong>：
                        <ul>
                            <li>关注时事政治</li>
                            <li>用理论分析现实问题</li>
                            <li>提高理论运用能力</li>
                        </ul>
                    </li>
                    <li><strong>系统学习法</strong>：
                        <ul>
                            <li>构建完整知识体系</li>
                            <li>理解知识间的联系</li>
                            <li>形成系统思维</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>历史学习方法</h3>
                <ul>
                    <li><strong>史论结合法</strong>：
                        <ul>
                            <li>以史实为基础</li>
                            <li>以理论为指导</li>
                            <li>史论结合分析问题</li>
                        </ul>
                    </li>
                    <li><strong>比较学习法</strong>：
                        <ul>
                            <li>比较不同历史时期</li>
                            <li>比较中外历史</li>
                            <li>在比较中加深理解</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>学习资源推荐</h2>
                <h3>教材与辅导书</h3>
                <ul>
                    <li><strong>人教版政治历史教材</strong>：基础知识学习</li>
                    <li><strong>《中学政治知识大全》</strong>：系统知识梳理</li>
                    <li><strong>《中国历史地图册》</strong>：直观历史学习</li>
                </ul>
                
                <h3>学习工具</h3>
                <ul>
                    <li><strong>思维导图软件</strong>：构建知识体系</li>
                    <li><strong>历史时间轴工具</strong>：梳理历史脉络</li>
                    <li><strong>政治时事APP</strong>：关注时政热点</li>
                </ul>
            `
        },
        'family-education': {
            title: '家庭教育指导 - 父母沟通策略与心理建设',
            content: `
                <a href="#" class="back-button" onclick="loadPage('home')">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                <h1>家庭教育指导</h1>
                <h2>家庭教育的重要性</h2>
                <img src="images/家庭教育沟通策略图.svg" alt="家庭教育沟通策略" style="width: 100%; margin: 2rem 0;">
                
                <h3>家庭教育在学习重建中的作用</h3>
                <ul>
                    <li><strong>情感支持</strong>：为孩子提供安全感和归属感</li>
                    <li><strong>学习环境</strong>：创造良好的家庭学习氛围</li>
                    <li><strong>习惯培养</strong>：帮助孩子建立良好的学习习惯</li>
                    <li><strong>动机激发</strong>：激发孩子的内在学习动机</li>
                    <li><strong>压力缓解</strong>：帮助孩子应对学习压力</li>
                </ul>
                
                <h2>父母沟通策略</h2>
                <h3>有效沟通的基本原则</h3>
                <ul>
                    <li><strong>尊重原则</strong>：
                        <ul>
                            <li>尊重孩子的人格和想法</li>
                            <li>避免居高临下的态度</li>
                            <li>认真倾听孩子的声音</li>
                        </ul>
                    </li>
                    <li><strong>理解原则</strong>：
                        <ul>
                            <li>站在孩子的角度思考问题</li>
                            <li>理解孩子的困难和挫折</li>
                            <li>给予情感上的支持</li>
                        </ul>
                    </li>
                    <li><strong>耐心原则</strong>：
                        <ul>
                            <li>给孩子充分的表达时间</li>
                            <li>不急于下结论或给建议</li>
                            <li>允许孩子犯错和成长</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>沟通技巧与方法</h3>
                <ul>
                    <li><strong>积极倾听</strong>：
                        <ul>
                            <li>全神贯注地听孩子说话</li>
                            <li>用眼神和肢体语言表示关注</li>
                            <li>适时给予回应和确认</li>
                            <li>不打断孩子的表达</li>
                        </ul>
                    </li>
                    <li><strong>开放式提问</strong>：
                        <ul>
                            <li>使用"什么"、"怎么"、"为什么"等开放式问题</li>
                            <li>避免"是不是"、"对不对"等封闭式问题</li>
                            <li>引导孩子深入思考和表达</li>
                        </ul>
                    </li>
                    <li><strong>情感表达</strong>：
                        <ul>
                            <li>用"我"的句式表达感受</li>
                            <li>避免指责和批评的语言</li>
                            <li>表达对孩子的关爱和支持</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>心理建设与支持</h2>
                <h3>建立孩子的自信心</h3>
                <ul>
                    <li><strong>认可努力过程</strong>：
                        <ul>
                            <li>表扬孩子的努力和进步</li>
                            <li>关注过程而非仅仅结果</li>
                            <li>帮助孩子看到自己的成长</li>
                        </ul>
                    </li>
                    <li><strong>设定合理目标</strong>：
                        <ul>
                            <li>根据孩子的实际情况设定目标</li>
                            <li>将大目标分解为小目标</li>
                            <li>让孩子体验成功的喜悦</li>
                        </ul>
                    </li>
                    <li><strong>提供成功体验</strong>：
                        <ul>
                            <li>创造孩子能够成功的机会</li>
                            <li>及时肯定孩子的成就</li>
                            <li>帮助孩子建立成功的记忆</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>培养孩子的抗挫折能力</h3>
                <ul>
                    <li><strong>正确看待失败</strong>：
                        <ul>
                            <li>教导孩子失败是成长的一部分</li>
                            <li>帮助孩子从失败中学习</li>
                            <li>避免过度保护</li>
                        </ul>
                    </li>
                    <li><strong>情绪管理指导</strong>：
                        <ul>
                            <li>教孩子识别和表达情绪</li>
                            <li>提供情绪调节的方法</li>
                            <li>示范健康的情绪表达方式</li>
                        </ul>
                    </li>
                    <li><strong>问题解决能力</strong>：
                        <ul>
                            <li>引导孩子分析问题</li>
                            <li>鼓励孩子寻找解决方案</li>
                            <li>支持孩子实施解决方案</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>学习环境营造</h2>
                <h3>物理环境优化</h3>
                <ul>
                    <li><strong>学习空间设置</strong>：
                        <ul>
                            <li>为孩子准备专门的学习区域</li>
                            <li>保持学习环境整洁有序</li>
                            <li>确保充足的光线和适宜的温度</li>
                            <li>减少干扰因素</li>
                        </ul>
                    </li>
                    <li><strong>学习工具准备</strong>：
                        <ul>
                            <li>准备必要的学习用品</li>
                            <li>提供适合的学习设备</li>
                            <li>建立学习资料的整理系统</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>心理环境营造</h3>
                <ul>
                    <li><strong>家庭氛围</strong>：
                        <ul>
                            <li>营造和谐温馨的家庭氛围</li>
                            <li>减少家庭冲突和争吵</li>
                            <li>建立相互支持的家庭关系</li>
                        </ul>
                    </li>
                    <li><strong>学习氛围</strong>：
                        <ul>
                            <li>全家人都重视学习</li>
                            <li>父母以身作则，热爱学习</li>
                            <li>鼓励家庭成员分享学习心得</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>常见问题与解决方案</h2>
                <h3>孩子学习动机不足</h3>
                <ul>
                    <li><strong>问题表现</strong>：
                        <ul>
                            <li>对学习缺乏兴趣</li>
                            <li>学习态度消极</li>
                            <li>容易放弃</li>
                        </ul>
                    </li>
                    <li><strong>解决策略</strong>：
                        <ul>
                            <li>帮助孩子找到学习的意义</li>
                            <li>设定有挑战性但可达成的目标</li>
                            <li>提供适当的奖励和认可</li>
                            <li>培养孩子的兴趣爱好</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>亲子关系紧张</h3>
                <ul>
                    <li><strong>问题表现</strong>：
                        <ul>
                            <li>沟通困难</li>
                            <li>频繁冲突</li>
                            <li>相互不理解</li>
                        </ul>
                    </li>
                    <li><strong>解决策略</strong>：
                        <ul>
                            <li>改善沟通方式</li>
                            <li>增加亲子互动时间</li>
                            <li>寻求专业帮助</li>
                            <li>建立家庭规则和边界</li>
                        </ul>
                    </li>
                </ul>
            `
        },
        'resources': {
            title: '学习资源集合 - 工具书籍与在线平台',
            content: `
                <a href="#" class="back-button" onclick="loadPage('home')">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                <h1>学习资源集合</h1>
                <h2>教材与参考书推荐</h2>
                
                <h3>数学学科资源</h3>
                <ul>
                    <li><strong>基础教材</strong>：
                        <ul>
                            <li>人教版初中数学教材（七、八、九年级）</li>
                            <li>北师大版初中数学教材</li>
                            <li>苏教版初中数学教材</li>
                        </ul>
                    </li>
                    <li><strong>辅导资料</strong>：
                        <ul>
                            <li>《初中数学基础训练》</li>
                            <li>《数学思维训练》</li>
                            <li>《初中数学知识大全》</li>
                            <li>《数学奥林匹克基础教程》</li>
                        </ul>
                    </li>
                    <li><strong>工具书</strong>：
                        <ul>
                            <li>《数学公式手册》</li>
                            <li>《初中数学定理定律汇编》</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>物理学科资源</h3>
                <ul>
                    <li><strong>基础教材</strong>：
                        <ul>
                            <li>人教版初中物理教材（八、九年级）</li>
                            <li>沪科版初中物理教材</li>
                            <li>苏科版初中物理教材</li>
                        </ul>
                    </li>
                    <li><strong>辅导资料</strong>：
                        <ul>
                            <li>《初中物理实验大全》</li>
                            <li>《物理概念解析》</li>
                            <li>《初中物理解题方法》</li>
                        </ul>
                    </li>
                    <li><strong>实验器材</strong>：
                        <ul>
                            <li>基础物理实验盒</li>
                            <li>电学实验器材</li>
                            <li>光学实验器材</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>英语学科资源</h3>
                <ul>
                    <li><strong>基础教材</strong>：
                        <ul>
                            <li>人教版初中英语教材</li>
                            <li>外研版初中英语教材</li>
                            <li>牛津版初中英语教材</li>
                        </ul>
                    </li>
                    <li><strong>辅导资料</strong>：
                        <ul>
                            <li>《新概念英语》（第一、二册）</li>
                            <li>《初中英语语法大全》</li>
                            <li>《英语词汇手册》</li>
                            <li>《英语阅读理解训练》</li>
                        </ul>
                    </li>
                    <li><strong>词典工具</strong>：
                        <ul>
                            <li>《牛津初阶英汉双解词典》</li>
                            <li>《朗文当代英语词典》</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>在线学习平台</h2>
                <h3>综合性学习平台</h3>
                <ul>
                    <li><strong>学而思网校</strong>：
                        <ul>
                            <li>覆盖全学科的在线课程</li>
                            <li>名师授课，质量较高</li>
                            <li>提供课后练习和测试</li>
                        </ul>
                    </li>
                    <li><strong>猿辅导</strong>：
                        <ul>
                            <li>直播课程，互动性强</li>
                            <li>个性化学习方案</li>
                            <li>配套练习和答疑</li>
                        </ul>
                    </li>
                    <li><strong>作业帮</strong>：
                        <ul>
                            <li>拍照搜题功能</li>
                            <li>详细解题步骤</li>
                            <li>在线答疑服务</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>学科专项平台</h3>
                <ul>
                    <li><strong>数学专项</strong>：
                        <ul>
                            <li>洋葱数学：动画讲解数学概念</li>
                            <li>Khan Academy：免费数学课程</li>
                            <li>数学加：数学思维训练</li>
                        </ul>
                    </li>
                    <li><strong>英语专项</strong>：
                        <ul>
                            <li>百词斩：词汇记忆</li>
                            <li>扇贝英语：综合技能训练</li>
                            <li>可可英语：听力训练</li>
                            <li>英语流利说：口语练习</li>
                        </ul>
                    </li>
                    <li><strong>物理专项</strong>：
                        <ul>
                            <li>物理大师：物理实验模拟</li>
                            <li>PhET：互动物理仿真</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>学习工具推荐</h2>
                <h3>时间管理工具</h3>
                <ul>
                    <li><strong>番茄工作法应用</strong>：
                        <ul>
                            <li>Forest：专注森林</li>
                            <li>Pomodone：番茄钟</li>
                            <li>Toggl：时间追踪</li>
                        </ul>
                    </li>
                    <li><strong>计划管理工具</strong>：
                        <ul>
                            <li>Any.do：任务管理</li>
                            <li>Todoist：待办事项</li>
                            <li>Microsoft To Do：微软待办</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>笔记整理工具</h3>
                <ul>
                    <li><strong>数字笔记</strong>：
                        <ul>
                            <li>印象笔记：全能笔记应用</li>
                            <li>有道云笔记：同步便捷</li>
                            <li>OneNote：微软笔记</li>
                        </ul>
                    </li>
                    <li><strong>思维导图</strong>：
                        <ul>
                            <li>XMind：专业思维导图</li>
                            <li>MindMaster：简单易用</li>
                            <li>FreeMind：免费开源</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>学习辅助工具</h3>
                <ul>
                    <li><strong>计算器类</strong>：
                        <ul>
                            <li>科学计算器</li>
                            <li>图形计算器</li>
                            <li>在线数学工具</li>
                        </ul>
                    </li>
                    <li><strong>翻译工具</strong>：
                        <ul>
                            <li>有道翻译：中英互译</li>
                            <li>Google翻译：多语言支持</li>
                            <li>百度翻译：本土化较好</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>免费学习资源</h2>
                <h3>视频学习资源</h3>
                <ul>
                    <li><strong>B站教育频道</strong>：
                        <ul>
                            <li>各学科免费课程</li>
                            <li>名师讲解视频</li>
                            <li>学习方法分享</li>
                        </ul>
                    </li>
                    <li><strong>网易公开课</strong>：
                        <ul>
                            <li>国内外名校课程</li>
                            <li>TED教育演讲</li>
                            <li>纪录片资源</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>题库资源</h3>
                <ul>
                    <li><strong>在线题库</strong>：
                        <ul>
                            <li>菁优网：各学科题库</li>
                            <li>组卷网：试卷生成</li>
                            <li>学科网：教学资源</li>
                        </ul>
                    </li>
                    <li><strong>模拟考试</strong>：
                        <ul>
                            <li>中考真题库</li>
                            <li>各地模拟试题</li>
                            <li>在线测评系统</li>
                        </ul>
                    </li>
                </ul>
                
                <h2>学习环境优化</h2>
                <h3>硬件设备</h3>
                <ul>
                    <li><strong>学习桌椅</strong>：
                        <ul>
                            <li>可调节高度的学习桌</li>
                            <li>符合人体工学的椅子</li>
                            <li>护眼台灯</li>
                        </ul>
                    </li>
                    <li><strong>电子设备</strong>：
                        <ul>
                            <li>平板电脑：便于在线学习</li>
                            <li>电子词典：查词便捷</li>
                            <li>录音笔：记录重点</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>学习用品</h3>
                <ul>
                    <li><strong>文具用品</strong>：
                        <ul>
                            <li>质量好的笔和本子</li>
                            <li>荧光笔和便签纸</li>
                            <li>尺子、圆规等绘图工具</li>
                        </ul>
                    </li>
                    <li><strong>整理用品</strong>：
                        <ul>
                            <li>文件夹和档案盒</li>
                            <li>标签贴和分类夹</li>
                            <li>书架和收纳盒</li>
                        </ul>
                    </li>
                </ul>
            `
        },
        'emergency': {
            title: '应急策略指南 - 危机处理与学习方法革命',
            content: `
                <a href="#" class="back-button" onclick="loadPage('home')">
                    <i class="fas fa-arrow-left"></i> 返回首页
                </a>
                <h1>应急策略指南</h1>
                <p class="intro">当学习遇到危机时，需要立即采取有效的应急措施。本指南提供全面的危机识别、处理方法和学习方法革命性改变策略。</p>
                
                <h2>🚨 危机识别与评估</h2>
                <h3>学业危机信号</h3>
                <div class="crisis-signals">
                    <div class="signal-category">
                        <h4>🔴 严重危机信号</h4>
                        <ul>
                            <li>成绩连续3次考试下降超过20分</li>
                            <li>多科目同时出现严重问题</li>
                            <li>完全失去学习动力和兴趣</li>
                            <li>出现严重的考试焦虑或恐惧</li>
                            <li>长期逃避学习相关活动</li>
                        </ul>
                    </div>
                    <div class="signal-category">
                        <h4>🟡 中度危机信号</h4>
                        <ul>
                            <li>成绩持续下降但幅度较小</li>
                            <li>学习效率明显降低</li>
                            <li>经常不完成作业</li>
                            <li>上课注意力严重不集中</li>
                            <li>对学习产生抵触情绪</li>
                        </ul>
                    </div>
                    <div class="signal-category">
                        <h4>🟢 轻度危机信号</h4>
                        <ul>
                            <li>偶尔成绩波动</li>
                            <li>学习方法需要调整</li>
                            <li>时间管理存在问题</li>
                            <li>某些科目出现困难</li>
                            <li>学习压力较大但可控</li>
                        </ul>
                    </div>
                </div>
                
                <h2>⚡ 24小时紧急处理方案</h2>
                <h3>第一阶段：情绪稳定（0-2小时）</h3>
                <div class="emergency-actions">
                    <h4>立即行动清单：</h4>
                    <ul>
                        <li>✅ 停止所有学习活动，给孩子情感支持</li>
                        <li>✅ 倾听孩子的感受，不要急于给建议</li>
                        <li>✅ 避免批评、指责或施加压力</li>
                        <li>✅ 确保孩子的基本需求（饮食、休息）</li>
                        <li>✅ 陪伴孩子，让其感受到安全感</li>
                    </ul>
                    
                    <h4>禁止行为：</h4>
                    <ul>
                        <li>❌ 不要说"你怎么这么笨"</li>
                        <li>❌ 不要立即要求孩子继续学习</li>
                        <li>❌ 不要与其他孩子比较</li>
                        <li>❌ 不要威胁或惩罚</li>
                    </ul>
                </div>
                
                <h3>第二阶段：压力缓解（2-6小时）</h3>
                <ul>
                    <li><strong>放松活动</strong>：散步、听音乐、看电影</li>
                    <li><strong>身体照顾</strong>：保证充足饮食和休息</li>
                    <li><strong>环境调整</strong>：暂时远离学习环境</li>
                    <li><strong>情绪疏导</strong>：鼓励表达内心感受</li>
                </ul>
                
                <h3>第三阶段：寻求支持（6-12小时）</h3>
                <ul>
                    <li><strong>联系学校</strong>：与班主任或任课老师沟通</li>
                    <li><strong>专业咨询</strong>：考虑心理咨询师帮助</li>
                    <li><strong>家庭会议</strong>：全家人共同讨论解决方案</li>
                    <li><strong>制定计划</strong>：初步制定恢复计划</li>
                </ul>
                
                <h3>第四阶段：制定方案（12-24小时）</h3>
                <ul>
                    <li><strong>问题分析</strong>：深入分析问题根本原因</li>
                    <li><strong>目标调整</strong>：重新设定合理的学习目标</li>
                    <li><strong>方法改革</strong>：制定新的学习方法</li>
                    <li><strong>支持系统</strong>：建立长期支持机制</li>
                </ul>
                
                <h2>📚 作业处理紧急方案</h2>
                <h3>作业积压处理策略</h3>
                <div class="homework-strategy">
                    <h4>优先级分类：</h4>
                    <ul>
                        <li><strong>A级（必须完成）</strong>：明天要交的作业、重要考试复习</li>
                        <li><strong>B级（尽量完成）</strong>：本周内要交的作业</li>
                        <li><strong>C级（可以延后）</strong>：预习作业、额外练习</li>
                    </ul>
                    
                    <h4>快速完成技巧：</h4>
                    <ul>
                        <li>🎯 <strong>25分钟专注法</strong>：每25分钟专注做一科作业，休息5分钟</li>
                        <li>📝 <strong>模板化处理</strong>：相似题目使用固定解题模板</li>
                        <li>🤝 <strong>合理求助</strong>：向同学、老师或家长寻求帮助</li>
                        <li>⚡ <strong>效率优先</strong>：先保证完成度，再追求质量</li>
                    </ul>
                </div>
                
                <h3>与老师沟通作业问题</h3>
                <div class="teacher-communication">
                    <h4>沟通话术模板：</h4>
                    <blockquote>
                        "老师您好，我是XXX的家长。孩子最近在学习上遇到了一些困难，作业完成情况不太理想。我们已经在家里制定了改进计划，希望能得到您的指导和支持。请问您方便的时候，我们可以详细沟通一下孩子的具体情况吗？"
                    </blockquote>
                    
                    <h4>沟通要点：</h4>
                    <ul>
                        <li>✅ 主动承认问题，表达改进意愿</li>
                        <li>✅ 说明已经采取的措施</li>
                        <li>✅ 请求老师的专业建议</li>
                        <li>✅ 询问是否可以适当调整作业量</li>
                        <li>✅ 承诺定期反馈进展情况</li>
                    </ul>
                </div>
                
                <h2>🔄 学习方法革命性改变</h2>
                <h3>传统方法 VS 革命方法</h3>
                <div class="method-comparison">
                    <div class="old-method">
                        <h4>❌ 传统低效方法</h4>
                        <ul>
                            <li>长时间死记硬背</li>
                            <li>题海战术，不求甚解</li>
                            <li>被动接受知识</li>
                            <li>单一学习方式</li>
                            <li>忽视错误分析</li>
                        </ul>
                    </div>
                    <div class="new-method">
                        <h4>✅ 革命高效方法</h4>
                        <ul>
                            <li>理解记忆，构建知识网络</li>
                            <li>精选题目，举一反三</li>
                            <li>主动探索，深度思考</li>
                            <li>多元化学习方式</li>
                            <li>错误驱动学习</li>
                        </ul>
                    </div>
                </div>
                
                <h3>具体革命策略</h3>
                <div class="revolution-strategies">
                    <h4>1. 时间革命：从时长到效率</h4>
                    <ul>
                        <li><strong>番茄工作法</strong>：25分钟高效学习 + 5分钟休息</li>
                        <li><strong>黄金时间</strong>：识别个人最佳学习时段</li>
                        <li><strong>任务分解</strong>：大任务分解为小目标</li>
                    </ul>
                    
                    <h4>2. 方法革命：从被动到主动</h4>
                    <ul>
                        <li><strong>费曼学习法</strong>：用简单语言解释复杂概念</li>
                        <li><strong>思维导图</strong>：可视化知识结构</li>
                        <li><strong>问题驱动</strong>：带着问题去学习</li>
                    </ul>
                    
                    <h4>3. 记忆革命：从机械到理解</h4>
                    <ul>
                        <li><strong>联想记忆</strong>：建立知识间的联系</li>
                        <li><strong>故事记忆</strong>：将知识编成故事</li>
                        <li><strong>间隔复习</strong>：科学安排复习时间</li>
                    </ul>
                </div>
                
                <h2>🎯 目标设定与动力重建</h2>
                <h3>SMART目标设定法</h3>
                <div class="smart-goals">
                    <ul>
                        <li><strong>S (Specific)</strong> - 具体明确：下次数学考试提高15分</li>
                        <li><strong>M (Measurable)</strong> - 可以测量：每天完成3道数学题</li>
                        <li><strong>A (Achievable)</strong> - 可以实现：基于当前水平设定</li>
                        <li><strong>R (Relevant)</strong> - 相关性强：与总体目标相关</li>
                        <li><strong>T (Time-bound)</strong> - 有时间限制：2周内完成</li>
                    </ul>
                </div>
                
                <h3>动力重建策略</h3>
                <div class="motivation-rebuild">
                    <h4>短期动力激发：</h4>
                    <ul>
                        <li>🏆 设置小目标，及时庆祝成功</li>
                        <li>🎁 建立奖励机制</li>
                        <li>👥 寻找学习伙伴</li>
                        <li>📈 可视化进步过程</li>
                    </ul>
                    
                    <h4>长期动力维持：</h4>
                    <ul>
                        <li>🌟 连接学习与个人兴趣</li>
                        <li>🔮 明确未来目标和意义</li>
                        <li>💪 培养成长型思维</li>
                        <li>🤝 建立支持网络</li>
                    </ul>
                </div>
                
                <h2>📞 紧急联系与支持</h2>
                <h3>专业支持机构</h3>
                <div class="support-contacts">
                    <h4>心理健康热线：</h4>
                    <ul>
                        <li>全国心理援助热线：400-161-9995</li>
                        <li>青少年心理咨询热线：12355</li>
                        <li>教育部心理健康热线：010-82951332</li>
                    </ul>
                    
                    <h4>学校支持系统：</h4>
                    <ul>
                        <li>班主任：[填写联系方式]</li>
                        <li>心理老师：[填写联系方式]</li>
                        <li>学科老师：[填写联系方式]</li>
                        <li>年级主任：[填写联系方式]</li>
                    </ul>
                </div>
                
                <h2>🛡️ 预防与监测</h2>
                <h3>日常监测指标</h3>
                <div class="monitoring-system">
                    <h4>学习状态监测：</h4>
                    <ul>
                        <li>📊 每日学习效率评分（1-10分）</li>
                        <li>📝 每周作业完成质量</li>
                        <li>📈 每月成绩变化趋势</li>
                        <li>🎯 目标达成情况</li>
                    </ul>
                    
                    <h4>心理状态监测：</h4>
                    <ul>
                        <li>😊 每日情绪状态记录</li>
                        <li>💤 睡眠质量评估</li>
                        <li>🍎 饮食和运动情况</li>
                        <li>👨‍👩‍👧‍👦 家庭关系和谐度</li>
                    </ul>
                </div>
                
                <h3>预防措施</h3>
                <ul>
                    <li><strong>建立预警机制</strong>：设定关键指标的警戒线</li>
                    <li><strong>定期评估调整</strong>：每月评估学习计划和方法</li>
                    <li><strong>培养应对技能</strong>：提前学习压力管理技巧</li>
                    <li><strong>加强沟通</strong>：保持家庭、学校的良好沟通</li>
                </ul>
                
                <div class="emergency-reminder">
                    <h3>🚨 紧急提醒</h3>
                    <p><strong>记住：任何学习危机都是暂时的，关键是采取正确的应对措施。不要让一时的困难影响长远的发展。及时寻求帮助，科学应对，一定能够度过难关！</strong></p>
                </div>
            `
        }
    };
    
    const template = pageTemplates[pageName];
    if (template) {
        return `
            <div class="content-page">
                ${template.content}
            </div>
        `;
    }
    
    return '<div class="content-page"><h1>页面内容正在开发中...</h1></div>';
}

// 搜索功能
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    if (!searchTerm) return;
    
    // 简单的搜索逻辑，可以根据需要扩展
    const searchResults = [];
    const pages = [
        'time-management', 'math', 'physics', 'english', 'chemistry', 
        'chinese', 'politics-history', 'biology', 'geography',
        'family-education', 'learning-strategies', 'homework-strategy', 
        'tutoring-decision', 'learning-diagnosis', 'resources', 
        'emergency', 'emergency-strategies'
    ];
    
    pages.forEach(page => {
        const content = generatePageContent(page);
        if (content.toLowerCase().includes(searchTerm)) {
            searchResults.push(page);
        }
    });
    
    // 显示搜索结果
    displaySearchResults(searchTerm, searchResults);
}

function displaySearchResults(searchTerm, results) {
    const dynamicContent = document.getElementById('dynamic-content');
    const homePage = document.getElementById('home-page');
    
    homePage.classList.remove('active');
    dynamicContent.classList.add('active');
    
    let resultHTML = `
        <div class="content-page">
            <a href="#" class="back-button" onclick="loadPage('home')">
                <i class="fas fa-arrow-left"></i> 返回首页
            </a>
            <h1>搜索结果</h1>
            <p>搜索关键词：<strong>${searchTerm}</strong></p>
    `;
    
    if (results.length > 0) {
        resultHTML += '<h2>找到以下相关内容：</h2><ul>';
        results.forEach(page => {
            const pageNames = {
                'time-management': '时间管理与学习计划',
                'math': '数学科目学习指南',
                'physics': '物理科目学习指南',
                'english': '英语科目学习指南',
                'chemistry': '化学科目学习指南',
                'chinese': '语文学科学习指南',
                'politics-history': '政治历史科目学习指南',
                'biology': '生物科目学习指南',
                'geography': '地理科目学习指南',
                'family-education': '家庭教育指导',
                'learning-strategies': '通用学习策略',
                'homework-strategy': '作业处理与师生沟通',
                'tutoring-decision': '辅导班选择与免费替代方案',
                'learning-diagnosis': '学习障碍深度诊断',
                'resources': '学习资源集合',
                'emergency': '应急策略指南',
                'emergency-strategies': '应急策略指南'
            };
            resultHTML += `<li><a href="#" onclick="loadPage('${page}')">${pageNames[page]}</a></li>`;
        });
        resultHTML += '</ul>';
    } else {
        resultHTML += '<p>未找到相关内容，请尝试其他关键词。</p>';
    }
    
    resultHTML += '</div>';
    dynamicContent.innerHTML = resultHTML;
}

// 页面加载完成后初始化搜索功能
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializePageLoader();
    initializeSearch();
});