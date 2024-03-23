import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-chrome";

function Compiler() {
  const [width, setWidth] = useState(1200);
  const [cppCode, setCppCode] = useState("");
  const [compilerResult, setCompilerResult] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const fetchOutputContent = async (outputLink) => {
    try {
      const response = await fetch(outputLink);

      if (response.ok) {
        const outputContent = await response.text();
        setCompilerResult((prevResult) => ({
          ...prevResult,
          run_status: { ...prevResult.run_status, output: outputContent },
        }));
      } else {
        setCompilerResult({ error: "Failed to fetch output content." });
      }
    } catch (error) {
      console.error("Error fetching output content:", error);
    }
  };

  const compileCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/compiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: cppCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setCompilerResult(data);
        setCheckingStatus(true);
        checkCompilationStatus(data.status_update_url);
        console.log("Response Data:", data);
      } else {
        setCompilerResult({ error: "Compilation failed. Please try again." });
      }
    } catch (error) {
      console.error("Error compiling code:", error);
    }
  };

  const checkCompilationStatus = async (statusUpdateUrl) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(statusUpdateUrl, {
          method: "GET",
          headers: {
            "client-secret": "0c4dfc1b49c97871aab1e4576bb9901ebd1171f6",
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data.request_status.code === "REQUEST_COMPLETED") {
            if (data.result.run_status && data.result.run_status.output) {
              fetchOutputContent(data.result.run_status.output);
            }

            setCheckingStatus(false);
            clearInterval(interval);
          } else if (
            data.request_status.code === "CODE_COMPILED" &&
            data.result.compile_status !== "OK"
          ) {
            setCompilerResult({ compile_status: data.result.compile_status });

            setCheckingStatus(false);
            clearInterval(interval);
          }
        } else {
          setCompilerResult({ error: "Compilation failed. Please try again." });
        }
      } catch (error) {
        console.error("Error checking compilation status:", error);
      }
    }, 2000);

    return interval;
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="compiler-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <div style={{ textAlign: "center", marginLeft: "700px" }}>
            <AceEditor
              mode="c_cpp"
              theme="chrome"
              name="code-editor"
              fontSize={16}
              value={cppCode}
              onChange={(value) => setCppCode(value)}
              editorProps={{ $blockScrolling: true }}
              width="600px"
              height="300px"
              
            />
          </div>
          <div>
            <Button
              onClick={compileCode}
              variant="primary"
              style={{ maxWidth: "250px", marginTop: "20px" }}
              disabled={checkingStatus}
            >
              <AiOutlineDownload />
              &nbsp;Compile
            </Button>
          </div>
          <div style={{ textAlign: "center", marginTop: "200px" }}>
            <pre>
              {compilerResult && compilerResult.error ? (
                <div>
                  <h3>Error:</h3>
                  <pre>{compilerResult.error}</pre>
                </div>
              ) : null}
              {compilerResult && compilerResult.compile_status ? (
                <div>
                  <h3>Error:</h3>
                  <pre>{compilerResult.compile_status}</pre>
                </div>
              ) : null}
              {compilerResult && compilerResult.run_status ? (
                <div>
                  <h3>Output:</h3>
                  <pre>{compilerResult.run_status.output}</pre>
                </div>
              ) : null}
            </pre>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Compiler;
