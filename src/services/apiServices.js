import axios from '../utils/axiosCustomize'
const postCreateUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}
const getAllUser = () => {
    return axios.get('/api/v1/participant/all')
}
const updateUser = (id, username, role, image) => {

    const data = new FormData();
    data.append('id', id);


    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}
const deleteUser = (userId) => {

    return axios.delete('api/v1/participant', { data: { id: userId } })
}
const getAllUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password, delay: 5000 })
}
const postRegister = (email, password) => {
    return axios.post('api/v1/register', { email, password })
}
const getQuizbyUser = () => {
    return axios.get('api/v1/quiz-by-participant')

}
const getDataQuiz = (quizId) => {
    
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`)

}
const postSubmitQuiz = (data) => {
   
    
    return axios.post('api/v1/quiz-submit', { ...data })
}
const postCreateNewQuiz = (description, name, difficulty, quizImage) =>{
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz',data)
}
export {
    postCreateUser, getAllUser, updateUser, deleteUser, getAllUserPaginate, postLogin, postRegister, getQuizbyUser, getDataQuiz,
    postSubmitQuiz, postCreateNewQuiz
}