document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. COUNTDOWN TIMER ---
    // Set countdown for 24 hours from now to create urgency
    let timeRemaining = 24 * 60 * 60; // 24 hours in seconds
    
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const h = Math.floor(timeRemaining / 3600);
        const m = Math.floor((timeRemaining % 3600) / 60);
        const s = timeRemaining % 60;
        
        hoursEl.textContent = h.toString().padStart(2, '0');
        minutesEl.textContent = m.toString().padStart(2, '0');
        secondsEl.textContent = s.toString().padStart(2, '0');
        
        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            // Reset to 24 hours when it reaches zero
            timeRemaining = 24 * 60 * 60;
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- 2. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a stats card, trigger number animation
                if(entry.target.classList.contains('stat-card')) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    if(numberEl && !numberEl.classList.contains('counted')) {
                        animateValue(numberEl, 0, parseInt(numberEl.getAttribute('data-target')), 2000);
                        numberEl.classList.add('counted');
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 3. NUMBER ANIMATION (STATISTICS) ---
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Formatting for specific stats
                if(end === 99) obj.innerHTML = "99.9";
                else obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- 4. PRICING CALCULATOR ---
    const calcType = document.getElementById('calc-type');
    const calcResult = document.getElementById('calc-result');
    
    if(calcType && calcResult) {
        calcType.addEventListener('change', (e) => {
            const val = parseFloat(e.target.value);
            if(val > 0) {
                calcResult.textContent = `S/ ${val.toFixed(2)}`;
                // Add a small bounce animation
                calcResult.style.transform = 'scale(1.1)';
                calcResult.style.color = '#fff';
                setTimeout(() => {
                    calcResult.style.transform = 'scale(1)';
                    calcResult.style.color = 'var(--accent)';
                }, 200);
            } else {
                calcResult.textContent = `S/ 0.00`;
            }
        });
    }

    // --- 5. SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
