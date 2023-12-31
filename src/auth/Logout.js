import firebase from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';


function Logout() {
    const [user, loading] = useAuthState(firebase.auth())
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null; // Hoặc hiển thị một trang hoặc thông báo lỗi
        //navigate('/login');
    }

    const handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                navigate('/login')
                console.log('Đăng xuất thành công');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <>
                <div className='sidenav_link' onClick={handleLogout}>
                    <i className='bx bx-log-out' />
                    <h3>Log out</h3>
                </div>

        </>
    );
}

export default Logout