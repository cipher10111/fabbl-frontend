import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Container,
  TextField,
  useTheme
} from "@material-ui/core";
import {
  KeyboardBackspace,
  CheckCircleOutlined,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";

import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateEmail, updatePassword } from "../redux/actions/userActions";
import { personalDataStyles } from "../assets/jss";

const useStyles = makeStyles((theme) => personalDataStyles(theme));

const PersonalData = () => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);
  const { id } = useParams();
  console.log(id);
  console.log({ userInfo });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, []);
  const [formData, setFormData] = useState({});
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleClick = () => {
    console.log(formData);
    dispatch(updateEmail({ id, data: formData.email }));
  };
  const handelPasswordChange = () => {
    const data = { oldPassword: formData.password1, newPassword: formData.password2 };
    if (formData.password2 === formData.password3) {
      dispatch(updatePassword({ data, id }));
    }
  };

  if (loading) return <div>loading</div>;
  return (
    <Container className={classes.root}>
      <div className={classes.profileHeader}>
        <IconButton color="primary">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h6" variant="h6">
          Privacy & Secuirty Data
        </Typography>
        <div />
      </div>
      <div className={classes.profileBody}>
        <Avatar src={userInfo.avatar.value} className={classes.avatar} variant="rounded" />
        <div className={classes.verify}>
          <Typography component="h6" variant="h6">
            {userInfo.gender.value === 0 ? "Male" : "Female"}
          </Typography>
          &nbsp;
          <CheckCircleOutlined fontSize="small" />
        </div>
        <div className={classes.fullWidth}>
          <Typography component="h6" variant="h6">
            Email
          </Typography>
          <TextField
            className={classNames(classes.textField)}
            placeholder="Email"
            variant="outlined"
            fullWidth
            size="small"
            defaultValue={userInfo.email}
            name="email"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className={classes.fullWidth}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-1ch" }}>
            <div />
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Update Email
            </Button>
          </div>
        </div>
        {[
          { placeholder: "Old Password", prop: "password1" },
          { placeholder: "New Password", prop: "password2" },
          { placeholder: "Confirm Password", prop: "password3" }
        ].map((el, i) => (
          <React.Fragment key={i}>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                {el.placeholder}
              </Typography>
              <TextField
                fullWidth
                placeholder={el.placeholder}
                name={el.prop}
                onChange={(e) => onChange(e)}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                className={classes.textField}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}>
                      {showPassword ? (
                        <Visibility style={{ color: theme.palette.text.secondary }} />
                      ) : (
                        <VisibilityOff style={{ color: theme.palette.text.secondary }} />
                      )}
                    </IconButton>
                  )
                }}
              />
            </div>
          </React.Fragment>
        ))}
        <div className={classes.fullWidth}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-1ch" }}>
            <div />
            <Button variant="contained" color="secondary" onClick={handelPasswordChange}>
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PersonalData;
