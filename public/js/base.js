console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  // sets up a variable for the body of the blog
  var body;
  // sets up a variable for the number of posts
  var numPosts=0;

/*  establishes functions for when the "Post" button is clicked   */

  $('#create-post-form').submit(function(e) {
  	e.preventDefault();
  	//console.log('Prevent default is working.');

/*   detects if create a post is empty  */
  	if ($('#create-post').val().trim().length > 0) {
      postInput = $('#create-post-form').serialize();
      // console.log(postInput);
      
      $.ajax({
              url: '/api/posts',
              type: "POST",
              data: postInput
            })
        .done(function(data){
          console.log('Made a post!', data);

          var postHtml = '<p class="list-group-item">' + data.postInput + ' <span class="pull-right" id="'+ data._id + '">Post #'+ numPosts+'<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p>';
          $("#post-list").prepend(postHtml);
          $('#create-post-form')[0].reset();
        })
        .fail(function(data) {
          console.log("Failed to make a post!");
        });

        }

        // keeps track of how many posts there are  
        numPosts++;

        /*  creates a button to clear posts after the first post is created   */

        if (numPosts===1) {
          $('#post-list').after('<button data-toggle="modal" data-target=".clear-modal-md" class="btn btn-default pull-right" id="clear-posts">Clear Posts</button>');
          }
        $('#post-list').after('<p id="post-count">Total posts: ' + numPosts+ '</p>');

      });

    // console.log(numPosts);

  		var postInput = $('#create-post').val();
      console.log(postInput);
      var newPost = '<p class="list-group-item">' + postInput + ' <span class="pull-right" id="post-number">Post #'+ numPosts+'<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p>';
      $('#create-post').val('');
      $('#post-list').prepend(postInput);
      


  	

// when the cancel button is clicked in the modal, the modal hides  

    $('#modal-cancel-button').click(function(e){
      $('#model-clear').modal("hide");
    });

 // gives the modal clear button function. Clears the posts, hides the clear button, and sets the number of posts back to 0, hides the modal

    $('#modal-clear-button').click(function(e){
      $('#post-list').empty();
      $('#post-count').empty();
      $('#clear-posts').hide();
      numPosts = 0;
      $('#model-clear').modal("hide");
    });

});
