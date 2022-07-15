/**
 * WordPress dependencies
 */
import { Modal, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';

/**
 * Controlled Component that shows a modal containing a confirm dialog. Inspired by Gutenberg's experimental
 * Confirm Dialog.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/confirm-dialog/
 * @param {Object}   props           Component props.
 * @param {boolean}  props.isOpen    Determines if the confirm dialog is open or not
 * @param {string}   props.title     Title for the confirm dialog. Default is window.location.host value.
 * @param {string}   props.children  Content for the confirm dialog, can be any React component.
 * @param {Function} props.onConfirm Callback called when the user click on "OK" or press Enter with the modal open.
 * @param {Function} props.onCancel  Callback called when the user click on "Cancel" or press ESC with the modal open.
 */
const ConfirmDialog = ( {
	isOpen = false,
	title = window.location.host,
	children,
	onConfirm,
	onCancel,
} ) => {
	useConfirmOnEnter( isOpen, onConfirm );
	if ( ! isOpen ) {
		return null;
	}
	return (
		<Modal
			title={ title }
			onRequestClose={ onCancel }
			shouldCloseOnClickOutside={ false }
		>
			<p>{ children }</p>
			<Button variant="tertiary" onClick={ onCancel }>
				{ __( 'Cancel', 'sensei-lms' ) }
			</Button>
			<Button variant="primary" onClick={ onConfirm }>
				{ __( 'OK', 'sensei-lms' ) }
			</Button>
		</Modal>
	);
};

/**
 * Calls onConfirm when registerListener is true and the user press ENTER.
 *
 * @param {boolean}  registerListener If the listener should be set up or not.
 * @param {Function} fn               The callback to call when the user press ENTER, if registerListener is true.
 */
const useConfirmOnEnter = ( registerListener, fn ) => {
	useEffect( () => {
		if ( ! registerListener ) {
			return;
		}
		const callback = ( event ) => {
			if ( event.keyCode === ENTER && ! event.defaultPrevented ) {
				event.preventDefault();
				fn();
			}
		};
		document.body.addEventListener( 'keydown', callback, false );
		return () =>
			document.body.removeEventListener( 'keydown', callback, false );
	}, [ registerListener, fn ] );
};

export default ConfirmDialog;
