const Modal = {
	init() {
		if (!this.initialized) {
			this.container = document.querySelector('.trace__modal');
			this.container.onclick = event => {
				if (event.target === this.container) {
					this.close();
				}
			};
			this.content = this.container.querySelector('.trace__modal__content');
			this.initialized = true;
		}
	},
	open(selector) {
		this.init();
		var rep = document.querySelector(selector);
		this.content.innerHTML = formatSource(rep.innerHTML);
		this.container.classList.add('trace__modal--active');
	},
	close() {
		this.init();
		this.container.classList.remove('trace__modal--active');
		this.content.innerHTML = '';
	},
};

function formatSource(string) {
	return String(string)
		.replace(/\n/g, '<br/>')
		.replace(/ /g, '&nbsp;')
		.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
	;
}

module.exports = Modal;
