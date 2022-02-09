--add new movie
CREATE OR REPLACE PROCEDURE new_movie (
    movie_name IN VARCHAR2,
    director IN VARCHAR2,
    owner_name IN VARCHAR2
) IS
BEGIN
    INSERT INTO movies VALUES(
        (SELECT MAX(id) + 1 FROM movies), 
        movie_name, 
        director, 
        owner_name,
        CURRENT_DATE,
        CURRENT_DATE);
END new_movie;

--Available tickets
CREATE OR REPLACE FUNCTION available_seats (pSchedule_id IN INTEGER)
RETURN NUMBER IS vAvailable NUMBER;
BEGIN
    SELECT s.number_of_seats - (SELECT COUNT(*) FROM tickets WHERE schedule_id = pSchedule_id) INTO vAvailable FROM schedules sc INNER JOIN stages s ON sc.stage_id = s.id WHERE sc.id = pSchedule_id ;
    
    RETURN vAvailable;
END available_seats;

