// Replace the input element with a textarea
let inputEl = document.querySelector('input[name="sourceFile"]');
let textareaEl = document.createElement('textarea');

inputEl.getAttributeNames().forEach(attrName => {
  textareaEl.setAttribute(attrName, inputEl.getAttribute(attrName));
});

inputEl.replaceWith(textareaEl);

// Update the text in the form
let cfiles = document.querySelectorAll('.field');
if (cfiles.length > 1) cfiles[1].textContent = "Put Code Here:";

// Set form target to "_blank"
let form = document.querySelector('.submitForm');
if (form) form.setAttribute('target', '_blank');

// Add click listener to the submit button
let button = document.querySelector('.submit');
if (button) {
  button.addEventListener('click', () => textareaEl.select());
}

// Replace the jQuery document-ready handler
document.addEventListener('DOMContentLoaded', () => {
  function adjustNotice(programTypeId) {
    const noticeEl = document.querySelector('.programTypeNotice');
    if (!noticeEl) return;

    noticeEl.textContent = "";
    if (programTypeId === 7 || programTypeId === 31) {
      noticeEl.textContent = "Almost always, if you send a solution on PyPy, it works much faster";
    }
  }

  adjustNotice(54);

  // Handle language selector changes
  const langSelect = document.querySelector('select[name="programTypeId"]');
  if (langSelect) {
    langSelect.addEventListener('change', function() {
      adjustNotice(parseInt(this.value));
    });
  }

  // Handle form submission
  const forms = document.querySelectorAll('.submit-form, .submitForm');
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      // Handle ftaa/bfaa
      const ftaa = this.querySelector('textarea[name="ftaa"]');
      const bfaa = this.querySelector('textarea[name="bfaa"]');
      if (window._ftaa && window._bfaa) {
        if (ftaa) ftaa.value = window._ftaa;
        if (bfaa) bfaa.value = window._bfaa;
      }

      // Handle enctype
      if (this.getAttribute('enctype') === 'multipart/form-data') {
        const sourceFiles = this.querySelector('.table-form textarea[name="sourceFile"]');
        if (sourceFiles && sourceFiles.files && sourceFiles.files.length === 0) {
          this.removeAttribute('enctype');
        }
      }
    }, { once: true }); // SubmitOnce → { once: true }
  });
});