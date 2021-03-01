/**
 * @author Ivan Sapronov on 27.02.2021
 * @project spring-boot-rest
 */


//Вспомогательная функция - формирует строковый массив ролей
//Из "selected multiple" полей ввода для последующей передачи его в JSON
function getRoles(inputId){
    let roles = new Array();
    $(`#${inputId} :selected`).each(function(){
        roles.push($(this).val());
    });
    return roles;
}

//Вспомогательная функция - формирует строку с перечислением ролей пользователя
//Для корректного отображения этой информации в представлении
function rolesToString(roles){
    let userRoles = "";
    for (let i = 0; i < roles.length; i++) {
        if (i == roles.length - 1) {
            userRoles += roles[i];
        } else {
            userRoles += roles[i] + ", ";
        }
    }
    return userRoles;
}

//Редактирование данных пользователя
function editUser() {
    let userForUpdate = {
        id: document.getElementById("editUser_Id").value,
        username: document.getElementById("editUser_Login").value,
        firstname: document.getElementById("editUser_Firstname").value,
        surname: document.getElementById("editUser_Surname").value,
        age: document.getElementById("editUser_Age").value,
        email: document.getElementById("editUser_Email").value,
        password: document.getElementById("editUser_Password").value,
        roles: getRoles("editUser_Roles"),
    };
    fetch('/admin', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userForUpdate)
    }).then(result => result.json()).then(json => createAllUsersTable(json));
};

function editModal(id) {
    let href = '/admin/' + id;
    fetch(href).then(
        result => {
            result.json().then(
                userForEdit => {
                    $('.myForm #editUser_Id').val(userForEdit.id);
                    $('.myForm #editUser_Login').val(userForEdit.username);
                    $('.myForm #editUser_Firstname').val(userForEdit.firstname);
                    $('.myForm #editUser_Surname').val(userForEdit.surname);
                    $('.myForm #editUser_Age').val(userForEdit.age);
                    $('.myForm #editUser_Email').val(userForEdit.email);
                    $('.myForm #editUser_Roles').val(userForEdit.roles);
                }
            )
        }
    )
    jQuery('#editModal').modal();
}

//Удаление пользователя из БД
function deleteUser() {
    let userForDelete = {
        id: document.getElementById("deleteUser_Id").value,
    };
    fetch('/admin', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userForDelete)
    }).then(result => result.json()).then(json => createAllUsersTable(json));
}

function deleteModal(id) {
    let link = '/admin/' + id;
    fetch(link).then(
        result => {
            result.json().then(
                userForDelete => {
                    $('.myDeleteForm #deleteUser_Id').val(userForDelete.id);
                    $('.myDeleteForm #deleteUser_Login').val(userForDelete.username);
                    $('.myDeleteForm #deleteUser_Firstname').val(userForDelete.firstname);
                    $('.myDeleteForm #deleteUser_Surname').val(userForDelete.surname);
                    $('.myDeleteForm #deleteUser_Age').val(userForDelete.age);
                    $('.myDeleteForm #deleteUser_Email').val(userForDelete.email);
                    $('.myDeleteForm #deleteUser_Roles').val(userForDelete.roles);
                }
            )
        }
    )
    jQuery('#deleteModal').modal();
}

//Формирование таблицы данных о всех пользователей в БД
function createAllUsersTable(users) {
    let tableRow = "";
    users.forEach((user) => {
        tableRow += "<tr>"
            + "<td>" + user.id + "</td>"
            + "<td>" + user.username + "</td>"
            + "<td>" + user.firstname + "</td>"
            + "<td>" + user.surname + "</td>"
            + "<td>" + user.age + "</td>"
            + "<td>" + user.email + "</td>"
            + "<td>" + rolesToString(user.roles) + "</td>"
            + "<td><a onclick=\"editModal("+user.id+");\" " +
            "class=\"btn btn-info\">Edit</a></td>"
            + "<td><a onclick=\"deleteModal("+user.id+");\" " +
            "class=\"btn btn-danger\">Delete</a></td>"
            + "</tr>";
    })

    document.getElementById("data").innerHTML = tableRow;
}

//Событие ready. Функция будет выполнена, когда DOM будет готов
$(document).ready(function ($) {

    fetch('/admin').then(result => {result.json().then(data => {createAllUsersTable(data);})});

    jQuery.getJSON('/current_user', function(data){
        document.getElementById("currentUsername").innerHTML = data.username;
        document.getElementById("currentRole").innerHTML = rolesToString(data.roles);
    });

    jQuery.getJSON('/current_user', function(info) {

        if (info.role == 'USER') {
            document.getElementById('tabSidebar').innerHTML = "" +
                "<li class=\"nav-item\">\n" +
                "    <a class=\"nav-link active\" data-toggle=\"tab\" href=\"#user\">User</a>\n" +
                "</li>";

            $('#user').attr('class', 'tab-pane fade show active');
            $('#admin').attr('class', 'tab-pane fade');
        }
    });

    jQuery.getJSON('/current_user', function(user){

        document.getElementById("user_Id").innerHTML = user.id;
        document.getElementById("user_Login").innerHTML = user.username;
        document.getElementById("user_Name").innerHTML = user.firstname;
        document.getElementById("user_Surname").innerHTML = user.surname;
        document.getElementById("user_Age").innerHTML = user.age;
        document.getElementById("user_Email").innerHTML = user.email;
        document.getElementById("user_Roles").innerHTML = rolesToString(user.roles);
    });

    // Добавление нового пользователя в БД
    jQuery('.currentUserPage #createNewUserButton').on('click', function (event) {

        event.preventDefault();

        let newUser = {
            username: document.getElementById("newLogin").value,
            firstname: document.getElementById("newName").value,
            surname: document.getElementById("newSurname").value,
            age: document.getElementById("newAge").value,
            email: document.getElementById("newEmail").value,
            password: document.getElementById("newPassword").value,
            roles: getRoles("newRoles"),
        };

        fetch('/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newUser)
        }).then(result => result.json()).then(json => createAllUsersTable(json));

        $('#all_users').attr('class', 'tab-pane fade show active border');
        $('#tabAllUsers').attr('class', 'nav-link active');
        $('#tabNewUser').attr('class', 'nav-link');
        $('#create_new_user').attr('class', 'tab-pane fade border');
    })
});