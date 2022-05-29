import React, { Fragment } from 'react';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';


export default function NewsCard(props) {
    // console.log("props",props);
    
    const { item } = props;
    const navigate = useNavigate();
    
    return (
        <Fragment>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {moment(item.publish_date).format('YYYY-MM-DD')}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {item.title.replace("_新浪新闻","")}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.author}
                    </Typography>
                    <Typography variant="body2">
                        {item.summary}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate(`/details/${item.id}`)}>查看新闻详情</Button>
                </CardActions>
            </Card>
        </Fragment>
    )
}
