import styled from 'styled-components';

export const Bar = styled.section`
  width: 100px;
  height: 100%;
  display: flex;
  flex-flow: column;
  position: fixed;
  z-index: 5;
`;

export const BarSection = styled.section`
  width: 100px;
  display: flex;
  position: relative;
  height: auto;
  flex-direction: column;
`;

export const LogoDiv = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;

  svg {
    color: #fff;
    width: 60px;
    height: 60px;
    margin: 20px;
  }
`;

export const BarWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const IconsWrapper = styled.div`
  margin: auto 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconElement = styled.div`
  height: 80px;
  display: flex;
  align-items: center;

  svg {
    color: #fff;
    width: 35px;
    height: 35px;
  }
`;

export const ProfileWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background: #fff;
  opacity: 0.9;
  position: absolute;
  bottom: 10px;
  margin: 10px;

  svg {
    width: 50px;
    height: 50px;
    margin: 16px 17px;
  }
`;

export const ProfileDetails = styled.div`
  width: 150px;
  height: 185px;
  padding: 10px;
  position: fixed;
  left: 100px;
  bottom: 57px;
  background: #f5f8fd;
  border-radius: 10px;
  opacity: 1;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
`;

export const ProfileTitle = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: #1584A4;
  padding: 15px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-bottom: 2px solid #1584A4;
`;

export const Element = styled(ProfileTitle)`
  color: #484b4e;
  font-weight: 500;
  border: unset;
  padding: 10px;
  padding-left: 20px;
  
`;

export const Logout = styled(ProfileTitle)`
  border: unset;
  border-top: 2px solid #1584A4;
  cursor: pointer;
`;
