export function getUsers() {
    const JsonUser = JSON.parse(localStorage.getItem('users'))
    if (!JsonUser) {
        return []
    }
    return JsonUser;
}

export function saveUsers(users) {
     localStorage.setItem('users', JSON.stringify(users))
}