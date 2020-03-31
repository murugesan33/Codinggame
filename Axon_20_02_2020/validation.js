/* Password validation rules:
    * Letters & numbers & only these symbols !@#$&*
    * Must have at least 1 letter, 1 number and 1 of the above symbols
    * Can't have 3 consecutive numbers in accending order, example 123 or 890
*/
var MyInput = class extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('my-input');
    console.log(template);
    const templateContent = template.content;

    console.log(templateContent)

    this.el = this.attachShadow({ mode: 'open' });
    //console.log(this.el);
    this.el.appendChild(templateContent.cloneNode(true));

    this.inputEl = this.el.querySelector('#input');
  }

  connectedCallback() {
    this.el.querySelector('#input').addEventListener('keyup', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const isValid = this.validate();
    if (!isValid) {
      if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
        this.inputEl.setCustomValidity('Only numbers');
      }
      else if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
        this.inputEl.setCustomValidity('Only Letters');
      }
      else {
        this.inputEl.setCustomValidity('Password check');
      }
      this.inputEl.reportValidity();
    } else {
      this.inputEl.setCustomValidity('');
      this.inputEl.reportValidity();
    }
  }

  validate() {

    if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
      if (/[^0-9]/.test(this.inputEl.value)) return false;
    }
    else if (this.el.querySelector('[name=validation-type]:checked').value === 'letter') {
      if (/[^a-zA-Z]/.test(this.inputEl.value)) return false;
    }
    else {
      if (/\d{3,3}/.test(this.inputEl.value)){        
        return false;
      }else{
        if (!(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#&*])[A-Za-z\d!@#&*]{1,}$/.test(this.inputEl.value))) {
          return false;
        }
      }

    }
    return true;
  }
}
customElements.define('my-input', MyInput);