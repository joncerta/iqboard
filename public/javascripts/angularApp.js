var app = angular.module('tuto', ['ui.router', 'angularUtils.directives.dirPagination', 'angularFileUpload']).directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatDepartment');
                });
            }
        }
    }
});;

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('index',{
			url: '/index',
			templateUrl: '/index.html',
			controller: 'MainCtrl'
		})
		.state('login',{
			url: '/login',
			templateUrl: '/login.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'auth', function($state, auth){
				if(auth.isLoggedIn()){
					$state.go('home');
				}
			}]
		})
		.state('register',{
			url: '/register',
			templateUrl: '/register.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'auth', function($state, auth){
				if(auth.isLoggedIn()){
					$state.go('home');
				}
			}]
		})
		.state('home',{
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl',
			resolve: {
				postPromise: ['posts', function(posts){
					//console.log(posts);
					 return posts.getAll();
				}]
			}
		})
		.state('posts',{
			url: '/posts/{id}',
			templateUrl: '/post.html',
			controller: 'PostCtrl',
			resolve: {
			    post: ['$stateParams', 'posts', function($stateParams, posts) {
			      return posts.get($stateParams.id);
			    }]
		  	}
		})
		.state('clientes',{
			url: '/clientes',
			templateUrl: '/clientes.html',
			controller: 'ClientCtrl',
			resolve: {
				postPromise: ['client','client', function(client){
					 return client.getAll();
				}]
			}
		})
		.state('editarcliente',{
			url: '/editarcliente/{id}',
			templateUrl: '/editarcliente.html',
			controller: 'editClientCtrl',
			resolve: {
			    cliente: ['$stateParams', 'client','client', function($stateParams, client) {
			    	//console.log(client.get($stateParams.id));
			      return client.get($stateParams.id);
			    }]
		  	}
		})
		.state('crearclientes',{
			url: '/crearclientes',
			templateUrl: '/crearclientes.html',
			controller: 'ClientCtrl',
			// resolve: {
			// 	postPromise: ['client', function(client){
			// 		 return client.getAll();
			// 	}]
			// }
		})
		.state('vercliente',{
			url: '/vercliente/{id}',
			templateUrl: '/vercliente.html',
			controller: 'verclienteCtrl',
			resolve: {
			    cliente: ['$stateParams', 'client', function($stateParams, client) {
			      return client.get($stateParams.id);
			    }],
			    cotizaciones: ['$stateParams', 'cotizacion', function($stateParams, cotizacion){
			  		//console.log(cotizacion);
			  		return cotizacion.getAll();
			  }]
		  	}
		})
		.state('creareventos',{
			url: '/eventos/{id}/creareventos',
			templateUrl: '/creareventos.html',
			controller: 'creareventosCtrl',
			resolve: {
			    cliente: ['$stateParams', 'client', function($stateParams, client) {
			      return client.get($stateParams.id);
			    }]
			}
		  	})
		.state('imagenes',{
			url: '/imagenes',
			templateUrl: '/imagenes.html',
			controller: 'MyCtrl',
			// resolve: {
			//     cliente: ['$stateParams', 'client', function($stateParams, client) {
			//       return client.get($stateParams.id);
			//     }]
			// }
		  	})
		.state('productos',{
			url: '/productos',
			templateUrl: '/productos.html',
			controller: 'productosCtrl',
			resolve: {
				productos: ['$stateParams', 'producto', function($stateParams, producto) {
			      return producto.getAll();
			  }]
			}
		  	})
		.state('editarproducto',{
			url: '/editarproducto/{id}',
			templateUrl: '/editarproducto.html',
			controller: 'editProductoCtrl',
			resolve: {
			    productos: ['$stateParams', 'producto', function($stateParams, producto) {
			    	// console.log(producto.get($stateParams.id));
			    	// console.log($stateParams);
			      return producto.get($stateParams.id);
			    }]
		  	}
		})
		.state('cotizacion',{
			url: '/cotizacion',
			templateUrl: '/cotizacion.html',
			controller: 'cotizacionCtrl',
			resolve: {
			    postPromise: ['client', function(client){
			    	//console.log(client);
					 return client.getAll();
			    }],
			    productos: ['$stateParams', 'producto', function($stateParams, producto) {
			      //console.log(producto);
			      return producto.getAll();
			  }],
			  	cotizaciones: ['$stateParams', 'cotizacion', function($stateParams, cotizacion){
			  		//console.log(cotizacion);
			  		return cotizacion.getAll();
			  }]
		  	}
		})
		.state('vercoti',{
			url: '/vercoti/{id}',
			templateUrl: '/vercoti.html',
			controller: 'vercotiCtrl',
			resolve: {
			  	cotizaciones: ['$stateParams', 'cotizacion', function($stateParams, cotizacion){
			  		//console.log(cotizacion);
			  		return cotizacion.get($stateParams.id);
			  }]
		  	}
		})
		.state('cotizaciones',{
			url: '/cotizaciones',
			templateUrl: '/cotizaciones.html',
			controller: 'cotizacionesCtrl',
			resolve: {
			  	cotizaciones: ['$stateParams', 'cotizacion', function($stateParams, cotizacion){
			  		//console.log(cotizacion);
			  		return cotizacion.getAll();
			  }]
		  	}
		})
		.state('editarcotizacion',{
			url: '/editarcotizacion/{id}',
			templateUrl: '/editarcotizacion.html',
			controller: 'editarcotizacionCtrl',
			resolve: {
			    cliente: ['$stateParams', 'client', function($stateParams, client){
			    	//console.log(client);
					 return client.getAll();
			    }],
			    productos: ['$stateParams', 'producto', function($stateParams, producto) {
			      //console.log(producto);
			      return producto.getAll();

			  }],
			  	cotizaciones: ['$stateParams', 'cotizacion', function($stateParams, cotizacion){
			  		//console.log(cotizacion);
			  		return cotizacion.get($stateParams.id);
			  }]
		  	}
		});

		$urlRouterProvider.otherwise('index');
}]);

app.factory('auth', ['$http', '$window', '$state', function($http, $window, $state){
	var auth = {};

	auth.saveToken = function(token){
		$window.localStorage['iqboard-token'] = token;
	};

	auth.getToken = function(){
		return $window.localStorage['iqboard-token'];
	};

	auth.isLoggedIn = function(){
		var token = auth.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	};

	auth.register = function(user){
		return $http.post('/register', user).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user){
		return $http.post('/login', user).success(function (data){
			auth.saveToken(data.token);
		});
	};

	auth.logOut = function(){
		$window.localStorage.removeItem('iqboard-token');
		$state.go('index');
	};

	return auth;
}]);

app.controller('AuthCtrl', ['$scope', '$state', 'auth', function ($scope, $state, auth){
	$scope.user = {};

	$scope.register = function(){
		auth.register($scope.user).error(function(error){
			$scope.error = error;
		}).then(function(){
			$state.go('home')
		});
	};

	$scope.logIn = function(){
		auth.logIn($scope.user).error(function(error){
			$scope.error = error;
		}).then(function(){
			$state.go('home');
		});
	};
}]);

app.factory('posts', ['$http', 'auth', function($http, auth){
	var o = {
    	posts_array: []
	};
	

	o.getAll = function(){
		return $http.get('/posts').success(function(data){
			//console.log(data);
			angular.copy(data, o.posts_array);
		});
	};

	o.deleteAll = function(){
		return $http.delete('/posts', {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			angular.copy(data, o.posts_array);
		});
	};

	o.create = function(post){
		return $http.post('/posts', post, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			//console.log(data);
			o.posts_array.push(data);
			//console.log(data);
		});
	}

	o.upvote = function(post){
		return $http.put('/posts/'+post._id+'/upvote', {
			headers: {authorization: 'Bearer '+auth.getToken()}
		})
		.success(function(data){
			post.upvotes += 1;
		});
	};

	//return a single post
	o.get = function(id){
		return $http.get('/posts/' + id, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).then(function(res){
			return res.data;
		});	
	};

	// delete a single post
	o.deleteOne = function(post){
		return $http.delete('/posts/' + post._id, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).then(function(res){
			o.getAll();
			return res.data;
		});
	}

	//add a comment
	o.addComment = function (id,comment){
		return $http.post('/posts/' + id + '/comments', comment, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		});
	};

	//upvote a comment
	o.upvoteComment = function(post, comment){
		return $http.put('/posts/'+post._id+'/comments/'+comment._id+'/upvote', {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).
		success(function(data){
			comment.upvotes += 1;
		});
	};


	return o;
}]);


app.controller('MainCtrl', ['$scope', 'posts', 'auth', function($scope, posts, auth){
	$scope.isLoggedIn = auth.isLoggedIn;

	$scope.posts = posts.posts_array;


	$scope.addPost = function(){
		if(!$scope.title || $scope.title === ''){return;}

		posts.create({
			title: $scope.title,
			link: $scope.link,
		});

		$scope.title = '';
		$scope.link = '';

	};

	//delete all
	$scope.deleteAll = function(){
		posts.deleteAll();
	};

	//delete all
	$scope.deleteOne = function(post){
		posts.deleteOne(post);
	};

	/*$scope.incrementUpvotes = function(post){
		post.upvotes += 1;
	};*/ 
	// se reemplaza por:

	$scope.incrementUpvotes = function(post) {
	  	posts.upvote(post);
	};
}]);

app.controller('PostCtrl', ['$scope','posts','post', 'auth', function ($scope, posts, post, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	//console.log(post);
	$scope.post = post;



	$scope.addComment = function(){
		if($scope.body === ''){return;}

		posts.addComment(post._id, {
			body: $scope.body,
			author: 'user',
		}).success(function(comment){
			$scope.post.comments.push(comment);
		});
		$scope.body = "";
	};

	$scope.incrementUpvotes = function(comment){
	  posts.upvoteComment(post, comment);
	};
}]);


app.factory('client', ['$http', 'auth', '$state', function($http, auth, $state){
	var c = {
    	clientes_array: []
	};


	c.getAll = function(){
		return $http.get('/clientes').success(function(data){
			//console.log(data);
			angular.copy(data, c.clientes_array);
		});
	};

	c.deleteAll = function(){
		return $http.delete('/clientes', {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			angular.copy(data, c.clientes_array);
		});
	};

	c.create = function(cliente){
		return $http.post('/clientes', cliente, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			//console.log(data);
			c.clientes_array.push(data);
			$state.go('clientes');
			alert("cliente registrado");
		});
	}

	c.edit = function(cliente){
		return $http.put('/editarcliente/' + cliente._id, cliente, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			angular.copy(data, c.clientes_array);
		});
	}

	//return a single client
	c.get = function(id){
		return $http.get('/editarcliente/' + id, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).then(function(res){
			//console.log(res.data);
			return res.data;
		});	
	};

	// delete a single post
	c.deleteOne = function(cliente){
		return $http.delete('/clientes/' + cliente._id, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).then(function(res){
			c.getAll();
			return res.data;
			alert("cliente eliminado");
		});
	}

	return c;
}]);

app.controller('ClientCtrl', ['$scope', 'client', 'auth', '$http', function($scope, client, auth, $http){
	$scope.isLoggedIn = auth.isLoggedIn;

 	//Filtro y paginacion
    $scope.currentPage = 1;
    $scope.pageSize = 10;

	$scope.client = client.clientes_array;

	$scope.contactos = [{id: 'contacto1'}];

	//delete uno
	$scope.clienteActual = function(cliente){
		auxCliente = cliente;
		console.log(auxCliente);
	};

	//delete uno
	$scope.deleteOne = function(){
		client.deleteOne(auxCliente);
		auxClienteux = "";
	};

	$scope.addNewContacto = function(){
		var newItemNo = $scope.contactos.length+1;
    $scope.contactos.push({'id':'contacto'+newItemNo});
    // console.log($scope.contactos);
	};

	$scope.removeContacto = function() {
    var lastItem = $scope.contactos.length-1;
    $scope.contactos.splice(lastItem);
  };

	$scope.addCliente = function(){
		client.create({
			tipo: $scope.tipo,
			name: $scope.name,
			address: $scope.address,
			tel: $scope.tel,
			clase: $scope.clase,
			ciudad: $scope.ciudad,
			numnit: { nit: $scope.nit, div: $scope.div },
			persona: $scope.contactos 
		});

		test = {
			tipo: $scope.tipo,
			name: $scope.name,
			address: $scope.address,
			tel: $scope.tel,
			clase: $scope.clase,
			ciudad: $scope.ciudad,
			numnit: { nit: $scope.nit, div: $scope.div },
			persona: $scope.contactos 
		};
		console.log(test);
	};

	//delete all
	$scope.deleteAll = function(){
		client.deleteAll();
	};
}]);

app.controller('editClientCtrl', ['$scope', 'client', 'cliente', 'auth', '$http', function($scope, client, cliente, auth, $http){

	$scope.editado = false;

	$scope.contactos = [{id: 'contacto1'}];


	$scope.addNewContacto = function(){
		var newItemNo = $scope.contactos.length+1;
    	$scope.contactos.push({'id':'contacto'+newItemNo});
    // console.log($scope.contactos);
	};

	$scope.removeContacto = function() {
    var lastItem = $scope.contactos.length-1;
    $scope.contactos.splice(lastItem);
  };

	//editar cliente
	$scope.editarCliente = function(){
		$scope.tipo_edit = $scope.tipo; 
		$scope.name_edit = $scope.name; 
		$scope.nit_edit = $scope.nit; 
		$scope.div_edit = $scope.div; 
		$scope.address_edit = $scope.address; 
		$scope.tel_edit = $scope.tel;
		$scope.clase_edit = $scope.clase;
		$scope.ciudad_edit = $scope.ciudad;
		$scope.nombreContacto_edit = $scope.nombreContacto;
		$scope.email_edit = $scope.email;
		$scope.cel_edit = $scope.cel;

		edit_client = {
			_id: cliente._id,
			tipo: $scope.tipo_edit,
			name: $scope.name_edit,
			numnit:{
				nit: $scope.nit_edit, 
				div: $scope.div_edit
			},
			address: $scope.address,
			tel: $scope.tel_edit,
			clase: $scope.clase_edit,
			ciudad: $scope.ciudad_edit,
			persona:$scope.contactos
		}

		console.log(edit_client);
		
		client.edit(edit_client);
		$scope.editado = true;
	}

	for(i=0; i < cliente.persona.length; i++){
		$scope.contactos[i] = cliente.persona[i];
	}

	$scope.cliente_editar = cliente;
	$scope.tipo = cliente.tipo;
	$scope.name = cliente.name;
	$scope.nit = parseInt(cliente.numnit.nit);
	$scope.div = parseInt(cliente.numnit.div);
	$scope.address = cliente.address;
	$scope.tel  = parseInt(cliente.tel);
	$scope.clase  = cliente.clase;
	$scope.ciudad  = cliente.ciudad;
	//$scope.nombreContacto  = $scope.contactos[0].nombreContacto;
	//$scope.email  = cliente.persona.email;
	//$scope.cel  = parseInt(cliente.persona.cel);
}]);

app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.logOut = auth.logOut;
}]);

app.controller('verclienteCtrl', ['$scope', 'client', 'cotizacion', 'cliente', function($scope, client, cotizacion, cliente){
	$scope.cliente = cliente;
	$scope.cotizacion = cotizacion.cotizacion_array;
	auxcliente = $scope.cliente.name;	

	$scope.identificador = function(){
		for(i = 0; i < $scope.cotizacion.length; i++){
		if($scope.cotizacion[i].cliente == auxcliente){
			identificador = $scope.cotizacion[i].consecutivo.numeroconsecutivo;
			console.log(i);
		}
	}
	}
}]);

/**
 * Created by theotheu on 09-04-14.
 */
app.controller('MyCtrl', ['$scope', '$http', '$timeout', '$upload', '$state', function ($scope, $http, $timeout, $upload, $state) {

    $scope.uploadRightAway = true;
    $scope.hasUploader = function (index) {
        return $scope.upload[index] != null;
    };
    $scope.abort = function (index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };
    $scope.onFileSelect = function ($files) {
        $scope.selectedFiles = [];
        $scope.progress = [];
        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] != null) {
                    $scope.upload[i].abort();
                }
            }
        }
        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.selectedFiles = $files;

        $scope.dataUrls = [];
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            if (window.FileReader && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);
                function setPreview(fileReader, index) {
                    fileReader.onload = function (e) {
                        $timeout(function () {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    }
                }

                setPreview(fileReader, i);
            }
            $scope.progress[i] = -1;
            // if ($scope.uploadRightAway) {
            //     console.log($scope.uploadRightAway);
            //     $scope.start(i);
            //     console.log(i);
            // }
        }
    }

    $scope.start = function (index) {
        $scope.progress[index] = 0;
      //  console.log('starting...');
      //  console.log($scope.myModel);
        //console.log($scope.selectedFiles[index]);
        // console.log("q: "+ $scope.precioDistribuidor);
        // console.log("q: "+ $scope.precioIntegrador);

        if($scope.precioDistribuidor == undefined){$scope.precioDistribuidor = 0;}
        if($scope.precioIntegrador == undefined){$scope.precioIntegrador = 0;}
        if($scope.precioPublico == undefined){$scope.precioPublico = 0;}
        if($scope.iva == undefined){$scope.iva = 0;}

        $scope.upload[index] = $upload.upload({
            url: 'upload',
            headers: {'myHeaderKey': 'myHeaderVal'},
            data: {
                referencia: $scope.referencia,
                marca: $scope.marca,
                descripcion: $scope.descripcion,
	        	precioDistribuidor: $scope.precioDistribuidor,
	        	precioIntegrador: $scope.precioIntegrador,
	        	precioPublico: $scope.precioPublico,
	    		iva: $scope.iva
	            },
	            file: $scope.selectedFiles[index],
	            fileFormDataName: 'myFile'
        }).then(function (response) {
            console.log('response', response.data);
            $scope.item=response.data;
            $scope.uploadResult.push(response.data.result);
        }, null, function (evt) {
           // $scope.progress[index] = parseInt(100.0 * evt.loaded / evt.total);
        });
        $state.go('home');
    }
}]);

app.factory('producto', ['$http', 'auth', '$state', function($http, auth, $state){
	var p = {
    	productos_array: []
	};

	p.getAll = function(){
		return $http.get('/productos').success(function(data){
			angular.copy(data, p.productos_array);
		});
	};


	//return a single producto
	p.get = function(id){
		return $http.get('/editarproducto/' + id, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).then(function(res){
			// console.log(res.data);
			return res.data;
		});	
	};

	p.edit = function(productos){
		return $http.put('/editarproducto/' + productos._id, productos, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			angular.copy(data, p.productos_array);
		});
	}

	p.deleteOne = function(producto){
		return $http.delete('/productos/' + producto._id, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).then(function(res){
			p.getAll();
			return res.data;
			alert("producto eliminado");
		});
	}

	return p;
}]);

app.controller('productosCtrl', ['$scope', 'producto', 'productos', 'auth', '$http', function($scope, producto, productos, auth, $http){
 	$scope.producto = producto.productos_array;
 	$scope.currentPage = 1;

    //delete uno
	$scope.productoActual = function(producto){
		//console.log(producto);
		auxProducto = producto;
		//console.log(auxProducto);
	};

	//delete uno
	$scope.deleteOne = function(){
		//console.log(auxProducto);
		producto.deleteOne(auxProducto);
		auxProductoux = "";
	};
 	//console.log(producto.productos_array);
}]);

app.controller('editProductoCtrl', ['$scope', 'producto','$timeout', '$upload', 'productos', 'auth', '$http', function($scope, producto, $timeout, $upload, productos, auth, $http){
	$scope.editado = false;
	$scope.reemplazo = false;
	$scope.onFileSelect = function ($files) {
        $scope.selectedFiles = [];
        $scope.progress = [];
        if ($scope.upload && $scope.upload.length > 0) {
            for (var i = 0; i < $scope.upload.length; i++) {
                if ($scope.upload[i] != null) {
                    $scope.upload[i].abort();
                }
            }
        }
        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.selectedFiles = $files;

        $scope.dataUrls = [];
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            if (window.FileReader && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);
                function setPreview(fileReader, index) {
                    fileReader.onload = function (e) {
                        $timeout(function () {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    }
                }

                setPreview(fileReader, i);
            }
            $scope.progress[i] = -1;
            // if ($scope.uploadRightAway) {
            //     console.log($scope.uploadRightAway);
            //     $scope.start(i);
            //     console.log(i);
            // }
        }
        $scope.reemplazo = true;
    }

	//editar producto
	$scope.editarProducto = function(){
		$scope.referencia_edit = $scope.referencia;
		$scope.marca_edit = $scope.marca;
		$scope.descripcion_edit = $scope.descripcion;
		$scope.precioDistribuidor_edit = $scope.precioDistribuidor;
		$scope.precioIntegrador_edit = $scope.precioIntegrador;
		$scope.precioPublico_edit = $scope.precioPublico;
		$scope.iva_edit = $scope.iva;
		$scope.imagen_edit = $scope.imagen;

		producto.edit({
			_id: productos._id,
			referencia: $scope.referencia_edit,
			marca : $scope.marca_edit,
			descripcion: $scope.descripcion_edit,
			precioDistribuidor: $scope.precioDistribuidor_edit,
			precioIntegrador: $scope.precioIntegrador_edit,
			precioPublico: $scope.precioPublico_edit,
			iva: $scope.iva_edit,
			imagen: $scope.imagen_edit
		});
		
	test = {
			_id: productos._id,
			referencia: $scope.referencia_edit,
			marca : $scope.marca_edit,
			descripcion: $scope.descripcion_edit,
			precioDistribuidor: $scope.precioDistribuidor_edit,
			precioIntegrador: $scope.precioIntegrador_edit,
			precioPublico: $scope.precioPublico_edit,
			iva: $scope.iva_edit,
			imagen: $scope.imagen_edit

		};
		console.log(test);

		$scope.editado = true;
	}
	$scope.productos_editar = productos;
	$scope.referencia = productos.referencia;
	$scope.marca = productos.marca;
	$scope.descripcion = productos.descripcion;
	$scope.precioDistribuidor = productos.precioDistribuidor;
	$scope.precioIntegrador = productos.precioIntegrador;
	$scope.precioPublico = productos.precioPublico;
	$scope.iva = productos.iva;
	$scope.imagen = productos.image;

console.log($scope.imagen);
}]);

app.factory('cotizacion', ['$http', 'auth', '$state', function($http, auth, $state){
	var coti = {
 		cotizacion_array: [],
	};

	coti.create = function(cotizacion){
		return $http.post('/cotizacion', cotizacion, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			//console.log(data);
			coti.cotizacion_array.push(data);
			//$state.go('cotizaciones');
			alert("Cotizacion realizada");
		});
	}

	coti.getAll = function(){
		return $http.get('/cotizacion').success(function(data){
			angular.copy(data, coti.cotizacion_array);
		});
	};

	//return a single producto
	coti.get = function(id){
		return $http.get('/vercoti/' + id, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).then(function(res){
			//console.log(res.data);
			return res.data;
		});	
	};

	coti.edit = function(cotizacion){
		return $http.put('/editarcotizacion/' + cotizacion._id, cotizacion, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).success(function(data){
			//console.log("entro");
			angular.copy(data, coti.cotizacion_array);
		});
	}

	coti.deleteOne = function(cotizacion){
		return $http.delete('/cotizaciones/' + cotizacion._id, {
			headers: {authorization: 'Bearer '+auth.getToken()}
		}).then(function(res){
			coti.getAll();
			console.log("entro");
			return res.data;
			alert("producto eliminado");
		});
	}

	return coti;	
}]);

app.controller('cotizacionCtrl', ['$scope', 'cotizacion', 'client', 'producto', 'auth', '$http', function($scope, cotizacion, client, producto, auth, $http){
 	$scope.producto = producto.productos_array;
 	$scope.client = client.clientes_array;
 	$scope.cotizacion = cotizacion.cotizacion_array;

 	$scope.productos = [{id: '1', referencia: "", image: "", descripcion: "", cantidad: ""}];
 	$scope.subtotal = 0;
 	$scope.iva = 0;
 	$scope.total = 0;
 	$scope.date = new Date();
 	$scope.anoconse;
 	var auxsubtotal;
 	var auxiva;
 	

	$scope.addNewProducto = function(){
		var newItemNo = $scope.productos.length+1;
    	$scope.productos.push({'id':newItemNo, referencia: "", image: "", descripcion: "", cantidad: ""});
	};

	$scope.removeProducto = function() {
    	var lastItem = $scope.productos.length-1;
    	$scope.productos.splice(lastItem);
  	};

  	var auxcotizacion = $scope.cotizacion.length -1;
  	//console.log($scope.cotizacion.length);
 	for(i=0; i <= $scope.cotizacion.length; i++){
 		//console.log('entro');
 		//console.log('numero consecutivo i');
 		//console.log(i);
 		if($scope.cotizacion.length <= 0){
 			//console.log('entro if');
 			$scope.consecutivo = 1;
 			//console.log($scope.consecutivo);
 			//console.log(i);
 		}else{
 			//console.log('entro else');
 			$scope.consecutivo = parseInt($scope.cotizacion[auxcotizacion].consecutivo.numeroconsecutivo) + 1;
 			//console.log($scope.cotizacion[auxcotizacion].consecutivo.numeroconsecutivo);
 			//console.log(i);
 		}
 	}
 	
 	if($scope.consecutivo < 10){
 		$scope.consecutivo = '000' + $scope.consecutivo;
 	}
 	if($scope.consecutivo >= 10 || $scope.consecutivo == 99){
 		$scope.consecutivo = '00' + $scope.consecutivo;
 	}
 	if($scope.consecutivo >= 100 || $scope.consecutivo == 999){
 		$scope.consecutivo = '0' + $scope.consecutivo;
 	}
 	if($scope.consecutivo >= 1000){
 		$scope.consecutivo = '' + $scope.consecutivo;
 	}

 	$scope.selcliente = function(auxClient){
 		$scope.name = auxClient;

 		for(i=0; i < $scope.client.length; i++){
 			if($scope.name  == $scope.client[i].name){
 				$scope.aux = $scope.client[i];
 				$scope.clase = $scope.client[i].clase;
 				return $scope.aux;
 			}else{
 				console.log("err");
 			}
 		}
 	};

 	$scope.selreferencia = function(auxProducto){
		var aux = $scope.productos.length - 1 ;
 		for(i=0; i < $scope.producto.length; i++){
 			if($scope.clase  === 'Distribuidor'){
 				$scope.productos[aux].auxclase = $scope.producto[i].precioDistribuidor;
			}
			if($scope.clase  === 'Integrador'){
				$scope.productos[aux].auxclase = $scope.producto[i].precioIntegrador;
			}
			if($scope.clase  === 'Publico'){
				$scope.productos[aux].auxclase = $scope.producto[i].precioPublico;
			}
			if($scope.producto[i].referencia == auxProducto){
				$scope.productos[aux].referencia = $scope.producto[i].referencia;
				$scope.productos[aux].image = $scope.producto[i].image;
				$scope.productos[aux].descripcion = $scope.producto[i].descripcion;
				$scope.productos[aux].iva = $scope.producto[i].iva;
				i = $scope.producto.length;
			}
 		}
 	};

 	$scope.cambiocantidad = function(cantidad, auxProducto){
 		var auxsub = $scope.productos.length - 1 ;
 		for (i = 0; i < $scope.productos.length; i++) {
 			if($scope.productos[auxsub].cantidad == ''){
 				$scope.subtotal = $scope.subtotal - auxsubtotal;
 				coniva = (auxiva/100) * auxsubtotal;
				$scope.iva = $scope.iva - coniva;
				$scope.total = $scope.subtotal + $scope.iva;
				//console.log('entro');
 			}
 			$scope.productos[auxsub].subtotal = $scope.productos[auxsub].cantidad * $scope.productos[auxsub].auxclase;
 			auxsubtotal = $scope.productos[auxsub].subtotal;
 			auxiva = $scope.productos[auxsub].iva;
 			//console.log($scope.productos);
 		}
 		if($scope.subtotal < 0){
 			$scope.subtotal = 0;
			$scope.iva = 0;
			$scope.total = 0;
			//console.log('entro if');
 		}else{
 			$scope.subtotal = $scope.subtotal + $scope.productos[auxsub].subtotal;
			coniva = ($scope.productos[auxsub].iva/100) * $scope.productos[auxsub].subtotal;
			$scope.iva = $scope.iva + coniva;
			$scope.total = $scope.subtotal + $scope.iva;
			//console.log('entro else');
 		}
 	};

 	$scope.recalculo = function(){
 		$scope.subtotal = $scope.subtotal - auxsubtotal;
 		coniva = (auxiva/100) * auxsubtotal;
		$scope.iva = $scope.iva - coniva;
		$scope.total = $scope.subtotal + $scope.iva;
 	};

 	$scope.date_aux = $scope.date.getTime();

 	$scope.addCotizacion = function(cantidad, auxProducto){
		cotizacion.create({
			fecha: $scope.date,
  			consecutivo: {
    			anoconse: $scope.date_aux,
    			numeroconsecutivo: $scope.consecutivo
  			},
  			cliente: $scope.name,
  			numnit: {
    			nit: $scope.aux.numnit.nit,
    			div: $scope.aux.numnit.div
  			},
  			ciudad: $scope.aux.ciudad,
  			direccion: $scope.aux.address,
  			contacto: $scope.aux.persona[0].nombreContacto,
  			email: $scope.aux.persona[0].email,
  			telefono: {
    			cel: $scope.aux.persona[0].cel,
    			tel: $scope.aux.tel
  			},
			productos: $scope.productos,
			subtotal: $scope.subtotal,
			iva: $scope.iva,
			total: $scope.total
		});

		test = {
			fecha: $scope.date,
  			consecutivo: {
    			anoconse: $scope.date_aux,
    			numeroconsecutivo: $scope.consecutivo
  			},
  			cliente: $scope.name,
  			numnit: {
    			nit: $scope.aux.numnit.nit,
    			div: $scope.aux.numnit.div
  			},
  			ciudad: $scope.aux.ciudad,
  			direccion: $scope.aux.address,
  			contacto: $scope.aux.persona[0].nombreContacto,
  			email: $scope.aux.persona[0].email,
  			telefono: {
    			cel: $scope.aux.persona[0].cel,
    			tel: $scope.aux.tel
  			},
			productos: $scope.productos,
			subtotal: $scope.subtotal,
			iva: $scope.iva,
			total: $scope.total
		};
		console.log(test);
		console.log($scope.iva);
		console.log($scope.subtotal);
	};

	var cont = $scope.consecutivo;
}]);

app.controller('vercotiCtrl', ['$scope', 'cotizacion', 'cotizaciones', 'auth', '$http', function($scope, cotizacion, cotizaciones, auth, $http){
	$scope.cotizaciones = cotizaciones;
}]);

app.controller('cotizacionesCtrl', ['$scope', 'cotizacion', 'cotizaciones', 'auth', '$http', function($scope, cotizacion, cotizaciones, auth, $http){
	$scope.cotizaciones = cotizacion.cotizacion_array;

console.log(cotizacion);

	$scope.cotizacionActual = function(cotizacion){
		console.log(cotizacion);
	// 	auxCotizacion = cotizaciones;
	// 	console.log(auxCotizacion);
	// };

	// //delete uno
	// $scope.deleteOne = function(){
	// 	console.log(auxCotizacion);
		// producto.deleteOne(auxProducto);
		// auxProductoux = "";
	};
}]);

app.controller('editarcotizacionCtrl', ['$scope', 'cotizaciones', 'cotizacion', 'auth', 'client', 'cliente', 'producto', 'productos', '$http', function($scope, cotizaciones, cotizacion, client, cliente, producto, productos, auth, $http){
	$scope.producto = productos.productos_array;
	$scope.clientes = cliente.clientes_array;

	// console.log(cotizaciones);

	$scope.productos = [{id: "", referencia: "", image: "", descripcion: "", cantidad: ""}];
	$scope.editado = false;
	var auxsubtotal;
 	var auxiva;

	$scope.addNewProducto = function(){
		var newItemNo = $scope.productos.length+1;
    	$scope.productos.push({'id':newItemNo, referencia: "", image: "", descripcion: "", cantidad: ""});
	};

	$scope.removeProducto = function() {
    	var lastItem = $scope.productos.length-1;
    	$scope.productos.splice(lastItem);
  	};
  	$scope.selcliente = function(auxClient){

 		$scope.cliente = auxClient;
		console.log(auxClient);
 		for(i=0; i < $scope.clientes.length; i++){
 			if($scope.cliente  == $scope.clientes[i].name){
 				$scope.ciudad = $scope.clientes[i].ciudad;
				$scope.div = $scope.clientes[i].numnit.div;
				$scope.nit = $scope.clientes[i].numnit.nit;
				$scope.ciudad = $scope.clientes[i].ciudad;
				$scope.direccion = $scope.clientes[i].address;
				$scope.contacto = $scope.clientes[i].persona[0].nombreContacto;
				$scope.cel = $scope.clientes[i].persona[0].cel;
				$scope.tel = $scope.clientes[i].tel;
				$scope.email =$scope.clientes[i].persona[0].email;
 				$scope.clase = $scope.clientes[i].clase;
 				// return $scope.aux;
 			}else{
 				console.log("err");
 			}
 		}
 	};

 	$scope.selreferencia = function(auxProducto){
		var aux = $scope.productos.length - 1 ;
		for(i=0; i < $scope.clientes.length; i++){
 			if($scope.cliente  == $scope.clientes[i].name){
				$scope.clase = $scope.clientes[i].clase;
			}
		}
 		for(i=0; i < $scope.producto.length; i++){
 			
 			// console.log($scope.clase);
 			if($scope.clase  === 'Distribuidor'){
 				$scope.productos[aux].auxclase = $scope.producto[i].precioDistribuidor;
			}
			if($scope.clase  === 'Integrador'){
				$scope.productos[aux].auxclase = $scope.producto[i].precioIntegrador;
			}
			if($scope.clase  === 'Publico'){
				$scope.productos[aux].auxclase = $scope.producto[i].precioPublico;
			}
			// console.log($scope.productos[aux].auxclase);
			if($scope.producto[i].referencia == auxProducto){
				$scope.productos[aux].referencia = $scope.producto[i].referencia;
				$scope.productos[aux].image = $scope.producto[i].image;
				$scope.productos[aux].descripcion = $scope.producto[i].descripcion;
				$scope.productos[aux].iva = $scope.producto[i].iva;
				i = $scope.producto.length;
			}
 		}
 	};

 	$scope.cambiocantidad = function(cantidad, auxProducto){
 		var auxsub = $scope.productos.length - 1 ;
 		for (i = 0; i < $scope.productos.length; i++) {
			auxsubtotal = $scope.productos[auxsub].subtotal;
			auxiva = $scope.productos[auxsub].iva;

 			if($scope.productos[auxsub].cantidad == ''){
 				
 				$scope.subtotal = $scope.subtotal - auxsubtotal;
 				// console.log(auxsubtotal);
 				// console.log($scope.subtotal);
 				coniva = (auxiva/100) * auxsubtotal;
				$scope.iva = $scope.iva - coniva;
				$scope.total = $scope.subtotal + $scope.iva;
				//console.log('entro');

 			}

			$scope.productos[auxsub].subtotal = $scope.productos[auxsub].cantidad * $scope.productos[auxsub].auxclase;
 			
 			
 			//console.log($scope.productos);
 		}
 		if($scope.subtotal < 0){
 			$scope.subtotal = 0;
			$scope.iva = 0;
			$scope.total = 0;
			// console.log('entro if');
 		}else{
 			$scope.subtotal = $scope.subtotal + $scope.productos[auxsub].subtotal;
			coniva = ($scope.productos[auxsub].iva/100) * $scope.productos[auxsub].subtotal;
			$scope.iva = $scope.iva + coniva;
			$scope.total = $scope.subtotal + $scope.iva;
			// console.log('entro else');
 		}
 	};

 	$scope.recalculo = function(){
 		$scope.subtotal = $scope.subtotal - auxsubtotal;
 		coniva = (auxiva/100) * auxsubtotal;
		$scope.iva = $scope.iva - coniva;
		$scope.total = $scope.subtotal + $scope.iva;
 	};

	//editar cotizacion
	$scope.editarCotizacion = function(){
		$scope.fecha_edit = $scope.fecha;
		$scope.anoconse_edit = $scope.anoconse;
		$scope.numeroconsecutivo_edit = $scope.numeroconsecutivo;
		$scope.cliente_edit = $scope.cliente;
		$scope.div_edit = $scope.div;
		$scope.nit_edit = $scope.nit;
		$scope.ciudad_edit = $scope.ciudad;
		$scope.direccion_edit = $scope.direccion;
		$scope.contacto_edit = $scope.contacto;
		$scope.cel_edit = $scope.cel;
		$scope.tel_edit = $scope.tel;
		$scope.email_edit = $scope.email;
		$scope.productos_edit = $scope.productos;
		$scope.subtotal_edit = $scope.subtotal;
		$scope.iva_edit = $scope.iva;
		$scope.total_edit = $scope.total;

		cotizacion.edit({
			_id: cotizaciones._id,
			fecha: $scope.fecha_edit,
			cliente : $scope.cliente_edit,
			ciudad: $scope.ciudad_edit,
			direccion: $scope.direccion_edit,
			contacto: $scope.contacto_edit,
			email: $scope.email_edit,
			subtotal: $scope.subtotal_edit,
			iva: $scope.iva_edit,
			total: $scope.total_edit,
			productos: $scope.productos_edit,
			telefono:{
				cel: $scope.cel_edit,
				tel: $scope.tel_edit
			},
			numnit:{
				nit: $scope.nit_edit,
				div: $scope.div_edit
			}, 
			consecutivo:{
				anoconse: $scope.anoconse_edit,
				numeroconsecutivo: $scope.numeroconsecutivo_edit
			}
		});
		
	test = {
			_id: cotizaciones._id,
			fecha: $scope.fecha_edit,
			cliente : $scope.cliente_edit,
			ciudad: $scope.ciudad_edit,
			direccion: $scope.direccion_edit,
			contacto: $scope.contacto_edit,
			email: $scope.email_edit,
			subtotal: $scope.subtotal_edit,
			iva: $scope.iva_edit,
			total: $scope.total_edit,
			productos: $scope.productos_edit,
			telefono:{
				cel: $scope.cel_edit,
				tel: $scope.tel_edit
			},
			numnit:{
				nit: $scope.nit_edit,
				div: $scope.div_edit
			}, 
			consecutivo:{
				anoconse: $scope.anoconse_edit,
				numeroconsecutivo: $scope.numeroconsecutivo_edit
			}
		};
		// console.log(test);

		$scope.editado = true;
	}

	$scope.cotizacion_editar = cotizaciones;
	$scope.fecha = cotizaciones.fecha;
	$scope.anoconse = cotizaciones.consecutivo.anoconse;
	$scope.numeroconsecutivo = cotizaciones.consecutivo.numeroconsecutivo;
	$scope.cliente = cotizaciones.cliente;
	$scope.div = cotizaciones.numnit.div;
	$scope.nit = cotizaciones.numnit.nit;
	$scope.ciudad = cotizaciones.ciudad;
	$scope.direccion = cotizaciones.direccion;
	$scope.contacto = cotizaciones.contacto;
	$scope.cel = cotizaciones.telefono.cel;
	$scope.tel = cotizaciones.telefono.tel;
	$scope.email = cotizaciones.email;
	$scope.productos = cotizaciones.productos;
	$scope.subtotal = cotizaciones.subtotal;
	$scope.iva = cotizaciones.iva;
	$scope.total = cotizaciones.total;
}]);

// app.directive('date', function (dateFilter) {
//     return {
//         require:'ngModel',
//         link:function (scope, elm, attrs, ctrl) {

//             var dateFormat = attrs['date'] || 'yyyy-MM-dd';
           
//             ctrl.$formatters.unshift(function (modelValue) {
//                 return dateFilter(modelValue, dateFormat);
//             });
//         }
//     };
// })


