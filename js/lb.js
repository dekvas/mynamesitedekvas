document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".modal-close");

    // Открытие модального окна при клике на мини-скриншот
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            modal.style.display = "flex";
            modalImg.src = this.getAttribute("data-fullsrc");
        });
    });

    // Закрытие модального окна при клике на крестик
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Закрытие модального окна при клике на фон
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Закрытие модального окна при нажатии клавиши Esc
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.style.display === "flex") {
            modal.style.display = "none";
        }
    });
	
});



document.addEventListener("DOMContentLoaded", function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Если аккордеона нет на странице - скрипт не выполняется
  if (faqItems.length === 0) return;

  function initAccordion() {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      // Закрываем все ответы при загрузке
      answer.style.maxHeight = '0';
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрываем все открытые пункты
        faqItems.forEach(el => {
          el.classList.remove('active');
          el.querySelector('.faq-answer').style.maxHeight = '0';
        });
        
        // Открываем текущий, если он был закрыт
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  initAccordion();
});
    
