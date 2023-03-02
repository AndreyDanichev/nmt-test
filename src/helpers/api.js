import axios from 'axios'

export default axios.create({
	baseURL: 'https://app.ecwid.com/api/v3/58958138/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})