const express = require('express');
const blogRouter = express.Router();
const {getAllBlogs, createBlog, updateBlog, showBlog, deleteBlog} = require('../controllers/blog-controller');


blogRouter.get('/', getAllBlogs);
blogRouter.post('/create', createBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.get('/:id', showBlog);
blogRouter.delete('/:id', deleteBlog);

module.exports = blogRouter;