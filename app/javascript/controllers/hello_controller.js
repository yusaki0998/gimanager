import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.textContent = "Hello World!"
    document.getElementById('user_email').value = 'aaa';
    $('#user_email').value = '1111';
  }
}
