document.addEventListener('DOMContentLoaded', function() {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navMenu = document.getElementById('navMenu');
    
    navbarBurger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.navbar-item').forEach(item => {
        item.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            caseCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    const versionTabs = document.querySelectorAll('.version-tabs .tab');
    const versionCards = document.querySelectorAll('.version-card');
    
    versionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            versionTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabType = this.dataset.tab;
            
            versionCards.forEach(card => {
                if (card.dataset.versionType === tabType) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
