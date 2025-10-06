function popupmenu() {
    const container = document.createElement("div");
    container.className = "container";
    
    container.innerHTML = `
        
<div class="menu">

  <div class="menu-links">
      <a href="vocabulary/vocabulary.html">Vocabulary</a>
      <a href="grammar.html">Grammar</a>
      <a href="pronounciation.html">Speech</a>
      <a href="multiple_choice.html">Multi-choice</a>
  </div>
</div>

    `;
    
     document.body.insertBefore(container, document.body.firstChild); // Appends to the body or change to desired parent element
}
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const toggle = document.querySelector(".menu-toggle");

    if (toggle) {
        toggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }
});
// Call the function to insert the menu
popupmenu();