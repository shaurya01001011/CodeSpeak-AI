package com.codespeak.controller;

import org.springframework.web.bind.annotation.*;
import java.io.*;

@RestController
@CrossOrigin
public class CodeController {

    @GetMapping("/")
    public String home() {
        return "CodeSpeak Backend is Running 🚀";
    }

    // 🧠 GENERATE CODE
    @PostMapping("/generate")
    public String generateCode(@RequestBody String prompt) {

        prompt = prompt.toLowerCase();
        int number = 10;

        for (String word : prompt.split(" ")) {
            try {
                number = Integer.parseInt(word);
            } catch (Exception ignored) {}
        }

        if (prompt.contains("even")) {
            return "public class Main {\n" +
                    "    public static void main(String[] args) {\n" +
                    "        for(int i=1;i<=" + number + ";i++){\n" +
                    "            if(i%2==0) System.out.println(i);\n" +
                    "        }\n" +
                    "    }\n" +
                    "}";
        }

        else if (prompt.contains("factorial")) {
            return "public class Main {\n" +
                    "    public static int factorial(int n) {\n" +
                    "        if(n==0) return 1;\n" +
                    "        return n * factorial(n-1);\n" +
                    "    }\n" +
                    "    public static void main(String[] args) {\n" +
                    "        System.out.println(factorial(" + number + "));\n" +
                    "    }\n" +
                    "}";
        }

        else if (prompt.contains("fibonacci")) {
            return "public class Main {\n" +
                    "    public static void main(String[] args) {\n" +
                    "        int a=0,b=1;\n" +
                    "        for(int i=0;i<" + number + ";i++){\n" +
                    "            System.out.println(a);\n" +
                    "            int c=a+b;\n" +
                    "            a=b;\n" +
                    "            b=c;\n" +
                    "        }\n" +
                    "    }\n" +
                    "}";
        }

        else {
            return "public class Main {\n" +
                    "    public static void main(String[] args) {\n" +
                    "        System.out.println(\"Sorry, I couldn't understand the request.\");\n" +
                    "    }\n" +
                    "}";
        }
    }

    // 🔊 EXPLAIN CODE
    @PostMapping("/explain")
    public String explainCode(@RequestBody String code) {

        if (code.contains("even")) {
            return "This program prints even numbers using a loop. It checks each number and prints it if it is divisible by 2.";
        }

        else if (code.contains("factorial")) {
            return "This program calculates factorial using recursion. It multiplies the number with factorial of previous numbers until it reaches zero.";
        }

        else if (code.contains("fibonacci")) {
            return "This program generates Fibonacci numbers where each number is the sum of the previous two numbers.";
        }

        else {
            return "This is a Java program with a main function where execution starts.";
        }
    }

    // ⚡ RUN CODE
    @PostMapping("/run")
    public String runCode(@RequestBody String code) {
        try {
            File file = new File("Main.java");
            FileWriter writer = new FileWriter(file);
            writer.write(code);
            writer.close();

            Process compile = Runtime.getRuntime().exec("javac Main.java");
            compile.waitFor();

            BufferedReader errorReader = new BufferedReader(
                    new InputStreamReader(compile.getErrorStream()));

            StringBuilder errors = new StringBuilder();
            String line;

            while ((line = errorReader.readLine()) != null) {
                errors.append(line).append("\n");
            }

            if (errors.length() > 0) {
                return "Compilation Error:\n" + errors;
            }

            Process run = Runtime.getRuntime().exec("java Main");

            BufferedReader outputReader = new BufferedReader(
                    new InputStreamReader(run.getInputStream()));

            StringBuilder output = new StringBuilder();
            while ((line = outputReader.readLine()) != null) {
                output.append(line).append("\n");
            }

            return output.toString();

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}