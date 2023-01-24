// material
import { Box, List } from '@mui/material';
// @types
import { Request } from './../../../../@types/request';
//
import TicketCommentItem from './RequestCommentItem';

// ----------------------------------------------------------------------

type RequestCommentListProps = {
  comments: Request["comments"];
  commentPerPage: number;
  page: number;
};


export default function RequestCommentList({ comments, commentPerPage, page }: RequestCommentListProps) {
  
  const sortedComment = comments.slice().sort((a:any , b:any) => b.createdDate - a.createdDate)

  return (

    <List disablePadding>
      { sortedComment.slice(page * commentPerPage, page * commentPerPage + commentPerPage)
      .map((comment) => {
        const { commentId } = comment;

        const { firstName, lastName } = comment.user;

        const postedBy = `${firstName} ${lastName}`;

 
        return (
          <Box key={ commentId } >
            <TicketCommentItem 
              name={postedBy}
              avatarUrl=""
              postedAt={comment.createdDate}
              message={comment.body}
              attachments={comment.attachedFilesUrls}
            />
          </Box>
        );
      })}
    </List>
  );
}
