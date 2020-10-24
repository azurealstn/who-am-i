(() => {

    const steps = document.querySelectorAll('.step');
    const grapshicItems = document.querySelectorAll('.graphic-item');
    let currentItem = grapshicItems[0]; // visible 클래스
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1; // 문자 -> 숫자 변환
    });

    for (let i = 0; i < steps.length; i++) {
        io.observe(steps[i]); // 모든 step들이 관찰대상이 됨
        steps[i].dataset.index = i;
        grapshicItems[i].dataset.index = i;
    }

    // visible 활성화
    function activate() {
        currentItem.classList.add('visible');
    }

    // visible 비활성화
    function inactivate() {
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = steps[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect();

            if ((boundingRect.top > window.innerHeight * 0.1) && (boundingRect.top < window.innerHeight * 0.8)) {
                inactivate();
                currentItem = grapshicItems[step.dataset.index];
                activate();
            }
        }

    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });

    activate();

})(); //함수 바로 실행