var Product=require("../models/product");
var Comment=require("../models/comment");

var middlewareObj={};

middlewareObj.checkProductOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Product.findById(req.params.id,(err,foundProduct)=>{
			if(err){
				res.redirect("back");
			}
			else{
				if(foundProduct.seller.id.equals(req.user._id)){
					next();	
				}
				else{
					req.flash("error","You dont have permission to do that");					
					res.redirect('back');
				}
			}
		})
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
}
middlewareObj.checkCommentOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,(err,foundComment)=>{
			if(err){
				req.flash("errot","Blog not found");
				res.redirect("back");
			}
			else{
				if(foundComment.author.id.equals(req.user._id)){
					next();	
				}
				else{
					req.flash("errot","You dont have permission to do that");
					res.redirect('back');
				}
			}
		})
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
}
middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error",'You need to be logged in to do that');
	res.redirect("/login");
}

module.exports=middlewareObj;