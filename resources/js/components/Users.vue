<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                  <button class="btn btn-success" @click="newModal">Add New <i class="fas fa-user-plus"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody><tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Registered</th>
                    <th>Modify</th>
                  </tr>
                  <tr v-for="user in users" :key="user.id">
                   <td>{{user.id}}</td>
                   <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.role | upText}}</td>
                    <td>{{user.created_at | myDate}}</td>
                    <td>
                        <a href="#" @click="editModal(user)">
                            <span style="font-size: 2em; color: blue;">
                            <i class="fa fa-user-edit" ></i>
                            </span>
                        </a>
                           |
                         <a href="#" v-on:click="deleteUser(user.id)">
                             <span style="font-size: 2em; color: red;">
                            <i class="fa fa-trash red"></i>
                            </span>
                        </a>
                    </td>
                  </tr>
                  
                  
                 
                </tbody></table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- Modal -->
<div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 v-show="!editmode" class="modal-title" id="addNewLabel">Add User</h5>
        <h5 v-show="editmode" class="modal-title" id="addNewLabel">Update User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent='editmode ? updateUser() : createUser()'>
      <div class="modal-body">
            <div class="form-group">
                <input v-model="form.name" type="text" name="name" id="name"
                placeholder="User name"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                <has-error :form="form" field="name"></has-error>
            </div>

             <div class="form-group">
                <input v-model="form.email" type="email" name="email" id="email"
                placeholder="User email"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                <has-error :form="form" field="email"></has-error>
            </div>

             <div class="form-group">
                <textarea v-model="form.bio" type="text" name="bio" id="bio"
                placeholder="User Bio"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                <has-error :form="form" field="bio"></has-error>
            </div>

             <div class="form-group">
                <select v-model="form.role" type="text" name="role" id="role"
                placeholder="User name"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('role') }">
                    <option value="">Select User Role</option>
                    <option value="administrator">Administrator</option>
                    <option value="user">User</option>
                     <option value="author">Author</option>
                </select>     
                <has-error :form="form" field="name"></has-error>
            </div>

            <div class="form-group">
                <input v-model="form.password" type="password" name="password" id="password"
                placeholder="User Password"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                <has-error :form="form" field="password"></has-error>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button v-show="editmode" type="submit" class="btn btn-success">Update User</button>
        <button v-show="!editmode" type="submit" class="btn btn-primary">Add User</button>
      </div>
      </form>
    </div>
  </div>
</div>
    </div>
</template>

<script>
    export default {
        data(){

            return {
                editmode: false,
                users: {},
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    bio: '',
                    photo: ''

                })
            }

        },

        methods: {
            updateUser(){
                this.$Progress.start();
                this.form.put('api/user/'+id)
                .then(() => {

                })
                .catch(() => { })
            },
            editModal(user){
                
                this.editmode = true;
                $('#addNew').modal('show');
                this.form.fill(user);
            },
             newModal(){
               
               this.editmode = false;
                this.form.reset();
                $('#addNew').modal('show');
            },
            deleteUser(id) {

                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {

                        //Send Request to the server
                       if (result.value) {
                        this.form.delete('api/user/'+id).then(() =>{
                        
                        swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                   
                        }).catch(() => {
                            swal("Failed", "Something went wrong", "warning");
                        
                        });
                       }
                    })
                    
            },

            loadUsers(){
                axios.get("api/user").then(({ data }) => (this.users = data.data));
            },
            createUser(){
                this.$Progress.start();
               this.form.post('api/user')
               .then(() => {
             $('#addNew').modal('hide')
               toast.fire({
                type: 'success',
                title: 'User added successfully'
                });
               this.$Progress.finish();
               })
               .catch(() => {})
             
               
            }
        },
        created() {
            this.loadUsers();
            setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>