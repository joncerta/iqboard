var express = require('express');
var passport = require('passport');
var jwt = require('express-jwt');
var router = express.Router();
var fs = require('fs');
// Mongoose
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Cliente = mongoose.model('Cliente');
var Evento = mongoose.model('Eventos');
var Imagen = mongoose.model('Image');
var Cotizacion = mongoose.model('Cotizacion');
var User = mongoose.model('User');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var Image = mongoose.model('Image');
var mv = require('mv');

/* REGISTER create a new user */
router.post('/register', function(req, res, next){
	if(!req.body.username || !req.body.password){
    	return res.status(400).json({message: 'Por favor complete los dos campos'});
  	}
	var user = new User();
	user.username = req.body.username;
	user.setPassword(req.body.password);

	user.save(function(err){
		if(err){return next(err); 
		}

		return res.json({token: user.generateJWT()});
	});
});

/* LOG IN */
router.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info){
		if(err){return next(err);}

		if(user){
			return res.json({token: user.generateJWT()});
			//console.log(user);
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /post page - get all post */
router.get('/posts',function (req, res, next){
	Post.find(function(err, posts){
		if(err){
			console.log('ERROR: ' + err);
			return next(err);
		}
		else{
			res.json(posts);
		}
	});
});


/* POST /post page - add a new post */
router.post('/posts', auth, function (req, res, next){
	var post = new Post(req.body);
	post.author = req.payload.username;

	post.save(function(err, post){
		if(err){
			console.log('ERROR: ' + err);
			return next(err);
		}else{
			 res.json(post);
		}
	});
});

/* General :post with id - specific object */
router.param('post', function (req,res,next,id){
	var query = Post.findById(id);

	query.exec(function(err,post){
		if(err){return next(err)}
		if(!post){return next(new Error('no post find'));}

		req.post = post;
		return next();
	});
});

/* GET / post page - get one post */
router.get('/posts/:post', function (req,res, next){
	req.post.populate('comments', function(err, post){
		if(err){return next(err);}

		res.json(post);
	});
});

/* DELETE ALL /  */
router.delete('/posts/', auth, function (req,res, next){
		Post.remove(function (err, post){
			if(err){return next(err);}
			res.json(post);
		});	
});


/* DELETE ONE /  */
router.delete('/posts/:post',  function (req,res, next){
		req.post.remove(function (err, post){
			if(err){return next(err);}
		res.json(post);
		});	
});


/* PUT / update upvotes */
router.put('/posts/:post/upvote', function (req, res, next){
	req.post.upvote(function(err, post){
		if(err){return next(err);}

		res.json(post);
	});
});

/* POST / comment for a particular post */
router.post('/posts/:post/comments', auth, function (req, res, next){
	console.log(req);
	var comment = new Comment(req.body);
	comment.post = req.post;
	comment.author = req.payload.username;

	comment.save(function (err, comment){
		if(err){return next(err);}
		req.post.comments.push(comment);
		req.post.save(function(err, post){
			if(err){ return next(err); }

			res.json(comment);
		});
	});
});

/* General :post with id - specific object */
router.param('comment', function (req,res,next,id){
	var query = Comment.findById(id);

	query.exec(function (err,comment){
		if(err){return next(err)}
		if(!comment){return next(new Error('no comment find'));}

		req.comment = comment;
		return next();
	});
});

/* PUT / update upvotes comments */
router.put('/posts/:post/comments/:comment/upvote', function (req, res, next){
	req.comment.upvote(function(err, comment){
		if(err){return next(err);}

		res.json(comment);
	});
});



// CLIENTES

/* GET /clientes page - get all clients */
router.get('/clientes',function (req, res, next){
	Cliente.find(function(err, cliente){
		if(err){
			console.log('ERROR: ' + err);
			return next(err);
		}
		else{
			res.json(cliente);
		}
	});
});


/* POST /clientes page - add a new client */
router.post('/clientes', auth, function (req, res, next){
	var cliente = new Cliente(req.body);
	cliente.author = req.payload.username;

	cliente.save(function(err, cliente){
		if(err){
			console.log('ERROR: ' + err);
			return next(err);
		}else{
			 res.json(cliente);
		}
	});
});

/* General :post with id - specific object */
router.param('cliente', function (req,res,next,id){
	var query = Cliente.findById(id);

	query.exec(function(err,cliente){
		if(err){return next(err)}
		if(!cliente){return next(new Error('no cliente find'));}

		req.cliente = cliente;
		return next();
	});
});

/* General :post with id - specific object */
router.param('producto', function (req,res,next,id){
	var query = Imagen.findById(id);

	query.exec(function(err,producto){
		//console.log(producto);
		if(err){return next(err)}
		if(!producto){return next(new Error('no producto find'));}

		req.producto = producto;
		return next();
	});
});

/* GET / post page - get one post */
router.get('/editarcliente/:cliente', function (req,res, next){
		res.json(res.req.cliente);
});

/* GET / post page - get one post */
router.put('/editarcliente/:cliente', function (req,res, next){


	Cliente.findByIdAndUpdate(req.cliente._id, 
	{$set: {
			tipo: req.body.tipo,
			name: req.body.name,
			numnit: {
				nit : req.body.numnit.nit,
				div : req.body.numnit.div
			},
			address: req.body.address,
		    tel: req.body.tel,
		    clase: req.body.clase,
		    ciudad: req.body.ciudad,
		    persona: req.body.persona 
		}
	}, function(err, user) {
	  if (err) throw err;
	});

	Cliente.findById(req.cliente._id, function(err, user){
		res.json(user)
	});
});


/* DELETE ALL /  */
router.delete('/clientes/', auth, function (req,res, next){
		Cliente.remove(function (err, cliente){
			if(err){return next(err);}
			res.json(cliente);
		});	
});


/* DELETE ONE /  */
router.delete('/clientes/:cliente', auth, function (req,res, next){
		req.cliente.remove(function (err, cliente){
			if(err){return next(err);}
		res.json(cliente);
		});	
});

/* DELETE ONE PRODUCTOS/  */
router.delete('/productos/:producto', auth, function (req,res, next){
		req.producto.remove(function (err, producto){
			if(err){return next(err);}
		res.json(producto);
		});	
});

/* EVENTOS */

/* General :event with id  */
router.param('evento', function (req,res,next,id){
	var query = Evento.findById(id);

	query.exec(function(err,evento){
		if(err){return next(err)}
		if(!evento){return next(new Error('no evento find'));}

		req.evento = evento;
		return next();
	});
});

/*Create Event */
router.post('/eventos/:cliente/newevent', auth, function (req, res, next){
	var evento = new Evento(req.body);
	evento.author = req.payload.username;

	 evento.save(function(err, evento){
		if(err){return next(err);}
		req.cliente.eventos.push(evento);
		req.cliente.save(function (err, evento){
			if(err){return next (err);}
			 res.json(evento);
		});
	});
});

/* upload image */

//app.post('/upload', controller.upload);
router.post('/upload', function (req, res, next){
	//console.log(req);
	var oldPath = req.files.myFile.path;
    var separator = '/';
    var filename = req.files.myFile.name;
    var newPath = [__dirname, '..', 'public', 'images', 'uploads', filename].join(separator);

    console.log('>>>>>');
    console.log('__dirname', __dirname);
    console.log('oldPath', oldPath);
    console.log('newPath: ', newPath);
    console.log('filename: ', filename);

    mv(oldPath, newPath, function (err) {

    	if(err){console.log(err);}
        if (!err) {

            var image = {
                referencia: req.body.referencia || "???",
                marca: req.body.marca || "???",
                descripcion: req.body.descripcion || "???",
        		precioDistribuidor: req.body.precioDistribuidor,
        		precioIntegrador: req.body.precioIntegrador,
        		precioPublico: req.body.precioPublico,
        		iva: req.body.iva,
                image: {
                    modificationDate: req.files.myFile.modifiedDate || new Date(),
                    name: req.files.myFile.name || "???",
                    size: req.files.myFile.size || 0,
                    type: req.files.myFile.type || "???",
                    filename: filename
                }
            };

           // console.log(image);
            doc = new Image(image);

            console.log('Renaming file to ', req.files.myFile.name);

            doc.save(function (err) {
            	if(err){console.log(err)}
            	else{  console.log("imagen subida"); }
                var retObj = {
                    meta: {"action": "upload", 'timestamp': new Date(), filename: __filename},
                    doc: doc,
                    err: err
                };

                return res.send(retObj);
            });
        }
    });

 //    mv(oldPath, newPath,  function(err) {
	//   if (err) { console.log(err); }
	//   console.log('file moved successfully');
	// };
});
 //GET datos de productos
router.get('/productos', function (req, res, next) {
	//console.log(req);
    Imagen.find(function(err, imagen){
		if(err){
			console.log('ERROR: ' + err);
			return next(err);
		}
		else{
			res.json(imagen);
		}
	});
});


/* GET / post page - get one post */
router.get('/editarproducto/:producto', function (req,res, next){
		res.json(res.req.producto);
});

/* GET / post page - get one post */
router.put('/editarproducto/:producto', function (req,res, next){

	Imagen.findByIdAndUpdate(req.producto._id, 
	{$set: {
			referencia: req.body.referencia,
                marca: req.body.marca,
                descripcion: req.body.descripcion,
        		precioDistribuidor: req.body.precioDistribuidor,
        		precioIntegrador: req.body.precioIntegrador,
        		precioPublico: req.body.precioPublico,
        		iva: req.body.iva,
                image: req.body.imagen
			}
	}, function(err, user) {
	  if (err) throw err;
	});

	Imagen.findById(req.producto._id, function(err, user){
		res.json(user)
	});
});

//Crear cotizacion

/* General :post with id - specific object */
router.param('cotizacion', function (req,res,next,id){
	var query = Cotizacion.findById(id);

	query.exec(function(err,cotizacion){
		if(err){return next(err)}
		if(!cotizacion){return next(new Error('no cotizacion find'));}

		req.cotizacion = cotizacion;
		return next();
	});
});

/* POST /clientes page - add a new cotizacion */
router.post('/cotizacion', auth, function (req, res, next){
	var cotizacion = new Cotizacion(req.body);
	cotizacion.author = req.payload.username;
console.log(req);
	cotizacion.save(function(err, cotizacion){
		if(err){
			console.log('ERROR: ' + err);
			return next(err);
		}else{
			 res.json(cotizacion);
			 console.log(cotizacion);
		}
	});
});

router.get('/cotizacion',function (req, res, next){
	Cotizacion.find(function(err, cotizacion){
		if(err){
			console.log('ERROR: ' + err);
			return next(err);
		}
		else{
			res.json(cotizacion);
		}
	});
});

/* GET / Ver cotizaciones */
router.get('/vercoti/:cotizacion', function (req,res, next){
		res.json(res.req.cotizacion);
});

/* GET / Editar cotizaciones */
router.get('/editarcotizacion/:cotizacion', function (req,res, next){
		res.json(res.req.cotizacion);
});

router.put('/editarcotizacion/:cotizacion', function (req,res, next){


	Cotizacion.findByIdAndUpdate(req.cotizacion._id, 
	{$set: {
			fecha: req.body.fecha,
			consecutivo:{
				anoconse: req.body.consecutivo.anoconse,
		 		numeroconsecutivo: req.body.consecutivo.numeroconsecutivo
			},
			cliente : req.body.cliente,
			numnit:{
				div: req.body.numnit.div,
				nit: req.body.numnit.nit
			},
			ciudad: req.body.ciudad,
			direccion: req.body.direccion,
			contacto: req.body.contacto,
			telefono:{
				cel: req.body.telefono.cel,
				tel: req.body.telefono.tel
			},
			email: req.body.email,
			productos: req.body.productos,
			subtotal: req.body.subtotal,
			iva: req.body.iva,
			total: req.body.total
		}
	}, function(err, user) {
	  if (err) throw err;
	});

	Cotizacion.findById(req.cotizacion._id, function(err, user){
		res.json(user)
	});
});

/* DELETE ONE /  */
router.delete('/cotizaciones/:cotizacion', auth, function (req,res, next){
		req.cotizacion.remove(function (err, cotizacion){
			if(err){return next(err);}
		res.json(cotizacion);
		});	
});

module.exports = router;
