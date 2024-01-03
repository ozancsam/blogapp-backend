const Blog = require('../model/blog');
const User = require('../model/user');

const getAllBlogs = async (req, res) => {
    let blogs;
    try {
        blogs = await Blog.find();
        if (blogs) {
            return res.json({ blogs });
        } else {
            return res.status(404).json({message: 'Blogs not found!'})
        }
    } catch (err) {
        return console.log(err);
    }
};

const createBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    const blog = new Blog({ title, description, image, user });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const existingUser = await User.findById(user);
        } catch (err) {
            return console.log(err);
        }
        if(!existingUser){
            return res.status(400).json({message:"Unable to find user"});
        }

        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
        return res.json({ blog });
    
    } catch (err) {
    await session.abortTransaction();
    return console.log(err);
}};



const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
        if (updatedBlog) {
            return res.json({ updatedBlog });
        } else {
            return res.status(500).json({ message: 'Cannot update at the moment!' });
        }
    } catch (err) {
        return console.log(err);
    }
};


const showBlog = async (req, res) => {
    const { id, title } = req.body;
    try {
        const blog = await Blog.findById(id);
        if (blog) {
            return res.json({ blog });
        } else {
            return res.status(404).json({ message: `Cannot show ${title}` })
        }
    } catch (err) {
        return console.log(err);
    }
};


const deleteBlog = async (req, res) => {
    const { id } = req.body;
    try {
        const blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await user.save(blog);
        if (blog) {
            return res.status(200).json({ message: 'Blog deleted!' });
        } else {
            return res.status(500).json({ message: 'Blog could not be deleted' });
        }
    } catch (err) {
        return console.log(err);
    }
};


module.exports = { getAllBlogs, createBlog, updateBlog, showBlog, deleteBlog };