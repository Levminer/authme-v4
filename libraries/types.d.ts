/* eslint-disable no-unused-vars */

declare global {
	/** Query selector element types */
	interface Element {
		/** Element styles */
		style: CSSStyleDeclaration
	}

	/** HTML dialog element types */
	interface LibDialogElement extends Element {
		/** Show the dialog as a modal */
		showModal: Function

		/* Close the modal */
		close: Function

		/** Property if dialog open */
		open: boolean
	}
}

export {}
