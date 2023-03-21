import React from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { useEffect } from "react";
import RadioButtonRN from "radio-buttons-react-native";
import axios from "axios";
import { ScrollView } from "react-native";

function Attendance({ navigation }) {
  const [grade, setGrade] = useState([]);
  const [section, setSection] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [student, setStudent] = useState([]);

  const logOut = () => {
    navigation.navigate("Login");
  };

  const fetchGradeSection = async () => {
    await axios
      .get("http://192.168.14.227:8000/api/grade")
      .then((res) => setGrade(res.data))
      .catch((err) => console.log(err));
  };

  const fetchallStudentByGradeSection = async () => {
    await axios
      .get(
        `http://192.168.14.227:8000/api/allStudent/${selectedGrade?.id}/${selectedSection?.id}`
      )
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  };

  const fetchAttendance = async (id, status) => {
    const res = await axios.post(
      `http://192.168.14.227:8000/api/attendance/${id}`,
      {
        status,
      }
    );

    Alert.alert(res.data.message);
  };

  useEffect(() => {
    fetchGradeSection();
  }, []);

  useEffect(() => {
    if (selectedGrade && selectedSection) {
      fetchallStudentByGradeSection();
    }
  }, [selectedGrade, selectedSection]);

  const handleGradeChange = (value) => {
    const selected = grade.find((grade) => grade.name === value);
    setSection(selected.sections);
    setSelectedGrade(selected);
  };

  const data = [
    {
      label: "present",
    },
    {
      label: "absent",
    },
    {
      label: "late",
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Attendance</Text>

        <SelectList
          setSelected={handleGradeChange}
          data={grade.map((g) => g.name)}
          placeholder={"Select Grade"}
          boxStyles={{ backgroundColor: "#EE8B3A", marginHorizontal: 20 }}
          dropdownStyles={{ backgroundColor: "#EE8B3A", color: "white" }}
          inputStyles={{ color: "white" }}
        />

        <SelectList
          setSelected={(value) => {
            const selected = section.find((s) => s.letter === value);
            setSelectedSection(selected);
          }}
          data={section.map((s) => s.letter)}
          placeholder={"Select Section"}
          boxStyles={{
            backgroundColor: "#EE8B3A",
            marginVertical: 10,
            marginHorizontal: 20,
          }}
          dropdownStyles={{ backgroundColor: "#EE8B3A", color: "white" }}
          inputStyles={{ color: "white" }}
        />
        {selectedGrade && selectedSection && (
          <Text style={styles.titleGrade}>
            {selectedGrade.name} {selectedSection.letter}
          </Text>
        )}
        {student &&
          student.map((s) => {
            return (
              <View style={styles.form}>
                <Text style={styles.titlename}>
                  {s.firstName} {s.lastName}
                </Text>
                <RadioButtonRN
                  data={data}
                  selectedBtn={(e) => {
                    console.log(e.label);
                    fetchAttendance(s.id, e.label);
                  }}
                />
              </View>
            );
          })}
        <TouchableOpacity
          style={styles.button}
          onPress={() => logOut(navigation)}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "#1e90ff",
  },
  titleGrade: {
    fontSize: 20,
    color: "#1e90ff",
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "#EE8B3A",
    width: "85%",
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  titlename: {
    fontSize: 20,
    color: "#1e90ff",
  },
   button: {
    width: 100,
    height: 25,
    marginTop: 10,
    backgroundColor: "#EE8B3A",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});

export default Attendance;
