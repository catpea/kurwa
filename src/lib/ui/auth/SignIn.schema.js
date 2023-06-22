export default function(){
	return [

		{
			name: 'action',
			variable: 'string', // commnad-line, funcion()
			control: 'string', // gui
			description: 'url to submit to',
			required: true,
			validator: ['Url']
		},

		{
			name: 'fingerprint',
			variable: 'boolean', // commnad-line, funcion()
			control: 'boolean', // gui
			description: 'enable fingerprint function',
			required: false,
			validator: ['Boolean'],
		},


	];
}
