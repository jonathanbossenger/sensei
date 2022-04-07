/**
 * WordPress dependencies
 */
import { Button, Modal } from '@wordpress/components';
import { search } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import CourseList from './course-list';
import InputControl from '../../../blocks/editor-components/input-control';

let needsReload = false;

const AddButton = (
	<Button
		className="sensei-student-modal__action--add"
		variant="primary"
		onClick={ () => {
			needsReload = true;
		} }
	>
		{ __( 'Add to Course', 'sensei-lms' ) }
	</Button>
);

const RemoveButton = (
	<Button
		className="sensei-student-modal__action--remove"
		onClick={ () => {
			needsReload = true;
		} }
	>
		{ __( 'Remove from Course', 'sensei-lms' ) }
	</Button>
);

const ResetButton = (
	<Button className="sensei-student-modal__action--remove">
		{ __( 'Reset or Remove Progress', 'sensei-lms' ) }
	</Button>
);

const POSSIBLE_ACTIONS = {
	add: {
		description: __(
			'Select the course(s) you would like to add students to:',
			'sensei-lms'
		),
		button: AddButton,
	},
	remove: {
		description: __(
			'Select the course(s) you would like to remove students from:',
			'sensei-lms'
		),
		button: RemoveButton,
	},
	'reset-progress': {
		description: __(
			'Select the course(s) you would like to reset or remove progress for:',
			'sensei-lms'
		),
		button: ResetButton,
	},
};

/**
 * Questions modal content.
 *
 * @param {Object}   props
 * @param {Object}   props.action  Action that is being performed.
 * @param {Function} props.onClose Close callback.
 */
export const StudentModal = ( { action, onClose } ) => {
	const { description, button } = POSSIBLE_ACTIONS[ action ];

	return (
		<Modal
			className="sensei-student-modal"
			title={ __( 'Choose Course', 'sensei-lms' ) }
			onRequestClose={ () => onClose( needsReload ) }
		>
			<p>{ description }</p>

			<InputControl
				placeholder={ __( 'Search courses', 'sensei-lms' ) }
				iconRight={ search }
			/>
			<CourseList />
			<div className="sensei-student-modal__action">{ button }</div>
		</Modal>
	);
};

export default StudentModal;
