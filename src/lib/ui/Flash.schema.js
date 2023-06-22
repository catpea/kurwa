export default function(){
	return [
		{
			name: 'title',
			variable: 'string', // commnad-line, funcion()
			control: 'string', // gui
			description: 'flash title',
			required: true,
			validator: ['ShortString'],
		},
		{
			name: 'message',
			variable: 'string', // commnad-line, funcion()
			control: 'string', // gui
			description: 'flash message',
			required: true,
			validator: null
		},
		{
			name: 'context',
			variable: 'string', // commnad-line, funcion()
			control: 'select', // gui
			description: '',
			required: true,
			choice: [ {name: 'Info', value: 'info'}, {name: 'Warning', value: 'warning'}, {name: 'Success', value: 'success'}, {name: 'Danger', value: 'danger'} ],
			default: 0,
			custom: false,
			validator: 'Choice',
		}
	];
}
