/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import metadata from './block.json';
const FEATURED_VIDEO_TEMPLATE = [ [ 'core/video' ] ];
const ALLOWED_BLOCKS = [
	'core/embed',
	'core/video',
	'sensei-pro/interactive-video',
];

export default {
	title: __( 'Featured Video', 'sensei-lms' ),
	description: __(
		'Add a featured video to your lesson to highlight the video and make use of our video templates.',
		'sensei-lms'
	),
	...metadata,
	edit: function EditBlock( { className, clientId } ) {
		const { replaceInnerBlocks, moveBlockToPosition } = useDispatch(
			'core/block-editor'
		);
		const innerBlockCount = useSelect(
			( select ) =>
				select( 'core/block-editor' ).getBlocks( clientId ).length
		);
		const previousBlockCount = useRef( innerBlockCount );
		useEffect( () => {
			if ( previousBlockCount.current > 0 && innerBlockCount === 0 ) {
				replaceInnerBlocks(
					clientId,
					[ createBlock( 'core/video' ) ],
					false
				);
			}
			previousBlockCount.current = innerBlockCount;
		}, [ innerBlockCount, clientId, replaceInnerBlocks ] );

		const { parentBlocks, rootClientId, blockIndex } = useSelect(
			( select ) => {
				const {
					getBlockParents,
					getBlockRootClientId,
					getBlockIndex,
				} = select( 'core/block-editor' );
				return {
					parentBlocks: getBlockParents( clientId ),
					rootClientId: getBlockRootClientId( clientId ),
					blockIndex: getBlockIndex( clientId ),
				};
			},
			[ clientId ]
		);

		// Move Featured Video block to top at top level.
		useEffect( () => {
			if ( parentBlocks?.length || blockIndex ) {
				moveBlockToPosition( clientId, rootClientId, '', 0 );
			}
		}, [
			parentBlocks,
			rootClientId,
			blockIndex,
			moveBlockToPosition,
			clientId,
		] );

		return (
			<div className={ className }>
				{
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ FEATURED_VIDEO_TEMPLATE }
						renderAppender={ false }
					/>
				}
			</div>
		);
	},
	save: () => {
		return <InnerBlocks.Content />;
	},
};
