export default function(){
	return [
		{
			name: 'value',
			variable: 'string', // commnad-line, funcion()
			control: 'string', // gui
			description: 'source code',
			required: true,
			validator: ['ShortString'],
		},
		{
			name: 'language',
			variable: 'string', // commnad-line, funcion()
			control: 'select', // gui
			description: 'language',
			required: true,
			choice: [
				{name: 'JavaScript', value: 'javascript'},
				{name: 'JSON', value: 'json'},
				{name: 'XML', value: 'xml'},
			],
			default: 0,
			custom: false,
			validator: 'Choice',
		}
	];
}
