import { registerBlockType } from '@wordpress/blocks';
import { Edit, Save } from './edit';
import metadata from './block.json';
import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
} );
