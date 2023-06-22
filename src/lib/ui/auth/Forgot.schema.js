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

	];
}
