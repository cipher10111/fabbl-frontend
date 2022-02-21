import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Divider,
  Container,
  Paper
} from "@material-ui/core";
import {
  KeyboardBackspace,
  Report,
  LocationOn,
  Cake,
  FavoriteBorder,
  CheckCircleOutlined
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { profileStyles } from "../assets/jss";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/userActions";
const useStyles = makeStyles((theme) => profileStyles(theme));
const tagsColor = [
  "#000000",
  "#172774",
  "#544179",
  "#0F044C",
  "#14274E",
  "#B000B9",
  "#0B4619",
  "#483434"
];

const Profile = ({ userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo, loading, isFriends } = useSelector((state) => state.user);
  const { id } = useParams();
  console.log(id);
  console.log({ userId });

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, []);

  if (loading) return <div>loading</div>;
  return (
    <Container className={classes.root}>
      <div className={classes.profileHeader}>
        <IconButton color="primary" href="/chat">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h6" variant="h6">
          {userInfo.displayName.value} `s profile
        </Typography>
        <IconButton className={classes.report}>{id != userId && <Report />}</IconButton>
      </div>
      <Paper className={classes.profileBody}>
        <Avatar src={userInfo.avatar.value} className={classes.avatar} variant="rounded" />
        <div className={classes.verify}>
          <Typography component="h6" variant="h6">
            {userInfo.gender.value === 0 ? "Male" : "Female"}
          </Typography>
          &nbsp;
          {userInfo.isProfileVerified && <CheckCircleOutlined fontSize="small" />}
        </div>
        <Typography component="h3" variant="h3">
          {userInfo.displayName.value}
        </Typography>

        <div className={classes.location}>
          <LocationOn fontSize="small" />
          {"  "}
          <Typography component="h6" variant="h6">
            {userInfo.location.value}
          </Typography>
        </div>
        <div className={classes.dob}>
          <Cake />
          &nbsp;&nbsp;&nbsp;
          <Typography align="center" component="h3" variant="body1">
            {Math.floor(new Date(userInfo.dob.value) / (365 * 24 * 60 * 60 * 1000))} Years Old
          </Typography>
        </div>
        <div>
          <Typography className={classes.bio} align="center" variant="h5">
            {userInfo.headline.value}
          </Typography>
        </div>
        <Divider width="100%" className={classes.divider} />
        <div className={classes.hobby}>
          <Typography align="center" component="h3" variant="h4">
            Hobbies & Interest
          </Typography>
          {userInfo.hobby.value.map((tag, i) => (
            <Button
              disableRipple
              style={{ backgroundColor: tagsColor[i % tagsColor.length], color: "#eee" }}
              size="small"
              className={classes.tags}
              key={i}>
              {tag}
            </Button>
          ))}
        </div>
        {id === userId || (
          <Button className={classes.favorite} variant="contained" color="secondary">
            Add To Friends &nbsp;&nbsp;&nbsp;
            <FavoriteBorder />
          </Button>
        )}
      </Paper>
    </Container>
  );
};
Profile.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Profile;
