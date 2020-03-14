const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
module.exports.create = async function(req, res){
   let post = await Post.findById(req.body.post);

        if(post){
            let comment =  await Comment.create({
                content: req.body.content,
                post:req.body.post,
                user: req.user._id,
             });

                post.comments.push(comment); 
                post.save();
                comment = await comment.populate('user','name email').execPopulate();
                //commentsMailer.newComment(comment);
                let job = queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('Error in creating the queue');
                    }
                    console.log(job.id);

                });
                if(req.xhr){
                    //similar for comments to fetch the user's id

                   

                    return res.status(200).json({
                        data:{
                            comment:comment,
                        },
                        message:"Post created",
                    });
                }

                req.flash('success','comment published');

                res.redirect('/');
             
             //,
            // function(err, comment){
            //     //handle error

            //     post.comments.push(comment);
            //     post.save();
            //     res.redirect('/');
            // });
        
    }
}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}