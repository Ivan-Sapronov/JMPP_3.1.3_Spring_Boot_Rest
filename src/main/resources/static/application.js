/**
 * @author Ivan Sapronov on 27.02.2021
 * @project spring-boot-rest
 */

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

    jQuery('.currentUserPage #createNewUserButton').on('click', function (event) {

        event.preventDefault();

        let newUser = {
            username: document.getElementById("newLogin").value,
            firstname: document.getElementById("newName").value,
            surname: document.getElementById("newSurname").value,
            age: document.getElementById("newAge").value,
            email: document.getElementById("newEmail").value,
            password: document.getElementById("newPassword").value,
            roles: getRoles(),
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

function getRoles(){
    let roles = new Array();
    $('#newRoles :selected').each(function(){
        roles.push($(this).val());
    });
    return roles;
}

function editModal(id) {

    let href = '/admin/' + id;

    fetch(href).then(
        result => {
            result.json().then(
                userForEdit => {
                    $('.myForm #editModalId').val(userForEdit.id);
                    $('.myForm #editModalUserName').val(userForEdit.username);
                    $('.myForm #editModalEmail').val(userForEdit.email);
                    $('.myForm #editModalRole').val(userForEdit.role);
                }
            )
        }
    )

    jQuery('#editModal').modal();
}


function deleteModal(id) {

    let link = '/admin/' + id;

    fetch(link).then(
        result => {
            result.json().then(
                userForDelete => {
                    $('.myDeleteForm #deleteModalId').val(userForDelete.id);
                    $('.myDeleteForm #userName').val(userForDelete.username);
                    $('.myDeleteForm #email').val(userForDelete.email);
                    $('.myDeleteForm #role').val(userForDelete.role);
                }
            )
        }
    )

    jQuery('#deleteModal').modal();
}


function editUser() {

    let userInfo = {
        id: document.getElementById("editModalId").value,
        userName: document.getElementById("editModalUserName").value,
        email: document.getElementById("editModalEmail").value,
        password: document.getElementById("editModalPassword").value,
        role: document.getElementById("editModalRole").value
    };

    fetch('/admin', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userInfo)
    }).then(result => result.json()).then(json => createAllUsersTable(json));
};


function deleteUser() {

    let idUser = {
        id: document.getElementById("deleteModalId").value,
    };

    fetch('/admin', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(idUser)
    }).then(result => result.json()).then(json => createAllUsersTable(json));
}


