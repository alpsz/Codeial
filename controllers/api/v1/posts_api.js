const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req, res){
    
        //populate the user of each post
           let posts  = await Post.find({})
           .sort('-createdAt')
           .populate('user')
            .populate({
                path:'comments',
                populate:{
                    path:'user'
                }
            });
        
           return res.json(200,{
                message:"Lists of posts",
                posts:posts
           });
       
}


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string
        if (post.user == req.params.id) {
            post.remove();

            await Comment.deleteMany({
                Post: req.params.id
            });

           
        return res.json(200,{
            message:"Post ans associated comments deleted successfully"
        });
           
        }
        else {
            return res.json(401,{
                message:"You cannot delete this post!",
            });
        }
    }catch (err) {
        console.log("********",err);
        //req.flash('error',err);
        return res.json(500,{
                message:"Internal server error"
        });
    }

}